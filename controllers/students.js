const flash = require('connect-flash');
const Student = require('../models/students');

module.exports.renderRegister = (req, res) => {
    res.render('students/new');
}

module.exports.renderIntermediate = (req, res) => {
    res.render('students/intermediate');
}

module.exports.renderHome = (req, res) => {
    res.render('students/home');
}

module.exports.register = async(req, res, next) => {
    try {
        const {username, regNo, contactNo, gender, year, depositAmount, email, password} = req.body;
        const user = new Student({ username, regNo, email, contactNo, gender, year, depositAmount});
        const registeredUser = await Student.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to VJTI Hostel Mess!');
            res.redirect('/students/home');
        })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('students/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/students/home';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success', "Goodbye!");
      res.redirect('/');
    });
}

module.exports.Profile = async(req, res) => {
    const id = req.user._id;
    const student = await Student.findById(id);
    res.render('students/profile', { student });
}

module.exports.History = async(req, res) => {
    const sid = req.user._id;
    const student = await Student.findById(sid);
    res.render('students/history', { student });
}
