const Admin = require('../models/admin');
const Student = require('../models/students');
const flash = require('connect-flash');
const { getStudents } = require('../utilities/getStudents');
const getMonth = require('../utilities/getMonth');
const warningMail = require('../utilities/warningMail');

var permeal = 0;

module.exports.renderHome = async(req, res) => {
    const admin = await Admin.findById(req.user._id);
    res.render('admins/adminHome', { admin });
}

module.exports.renderLogin = (req, res) => {
    res.render('admins/adminlogin');
}

module.exports.AdminLogin = async(req, res) => {
    req.flash('success', 'Welcome!');
    const redirectUrl = req.session.returnTo || '/admin/home';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.AdminLogout=function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success', "Goodbye!");
      currentUser = undefined
      res.redirect('/');
    });
}

module.exports.renderAdminPage = async(req, res) => {
    let students = [];
    const admin =  await Admin.findById(req.user._id);
    if ((admin.activeStudents).length !== 0){
        students = await getStudents(admin.activeStudents);
    }
    console.log(students.length)
    res.render('admins/adminpage', { students });
}

module.exports.AddStudent = async(req, res) => {
    const regNo = req.body.regid;
    const adminId = req.user._id;
    const admin = await Admin.findById(adminId);
    const student = await Student.findOne({ regNo });
    if (student) {
        if((admin.activeStudents).includes(student._id))
        {
            req.flash('error', 'Student already in');
        }
        else 
        {
            await Admin.findByIdAndUpdate(adminId, { $push: {activeStudents: student._id }});
            req.flash('success', 'Student found');
        }
    }
    else {
        req.flash('error', 'Student Not Found');
    }
    res.redirect('/admin/adminpage');
}

module.exports.HandleCheckout = async(req, res) => {
    const id = req.params.id;
    const { guests, additionalCharges } = req.body;
    const numMeals = parseInt(guests) + 1;
    const addon = parseInt(additionalCharges);
    const student = await Student.findByIdAndUpdate(id, { $inc: { meals: numMeals ,  additionalCharges: addon }}); 
    req.flash('success', 'Added to student data');
    await Admin.findByIdAndUpdate(req.user._id, { $inc: { meals: 1 }, $pull: { activeStudents: student._id }});
    res.redirect('/admin/adminpage');
}

module.exports.ViewStudents = async(req, res) => {
    const students = await Student.find();
    res.render('admins/viewStudents', { students });
}

module.exports.ViewDefaulters = async(req, res) => {
    const allStudents = await Student.find();
    const defaults = [];
    for (let s of allStudents)
    {
        if (s.depositAmount < 0)
        { defaults.push(s); }
    }
    res.render('admins/viewDefaulters', { defaults });
}

module.exports.StudentProfile = async(req, res) => {
    const student = await Student.findById(req.params.id);
    res.render('admins/profile', { student });
}

module.exports.GenerateBill = async(req, res) => {
    const admin = await Admin.findById(req.user._id);
    res.render('admins/generateBill', { admin, permeal });
}

module.exports.CalculateMeal = async(req, res) => {
    const admin = await Admin.findById(req.user._id);
    const { expense, number } = req.body;
    console.log(parseInt(expense));
    console.log(parseInt(number));
    permeal = parseInt(expense) / parseInt(number);
    permeal = Math.round(permeal);
    res.render('admins/generateBill', { admin, permeal });
}

module.exports.CalculateBill = async(req, res) => {
    const students = await Student.find();
    const m = getMonth();
    for (s of students){
        const amt = permeal * s.meals + s.additionalCharges;
        const deposit = s.depositAmount - amt;
        const records = { month: m, amount: amt };
        await Student.findByIdAndUpdate(s._id, { $set: {depositAmount: deposit, meals: 0, additionalCharges: 0}, $push: { records }});
    }
    permeal = 0;
    req.flash('success', 'Bill generated successfully!');
    res.redirect('/admin/generateBill');
}

module.exports.SendWarningMail = async(req, res) => {
    const allStudents = await Student.find();
    const defaulters = [];
    for (let s of allStudents) {
        if (s.depositAmount <= 0)
        { defaulters.push(s.email); }
    }
    warningMail(defaulters);
    req.flash('success', 'Warning Mails sent!');
    res.redirect('/admin/defaulters');
}