const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');

const Admin = require('../models/admin');
const Student = require('../models/students');
const catchAsync = require('../utilities/catchAsync');


router.get('/login', (req, res) => {
    res.render('admins/adminlogin');
})

router.post('/login', catchAsync(async(req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await Admin.findOne({ email});
    console.log(user.password);
    const validPassword = await bcrypt.compare(password, user.password, function(){
    if (validPassword) {
        res.send("Welcome!")
    }
    else {
        res.send("Try Again!")
        console.log(validPassword);
    }})
}))
router.get('/adminpage', (req, res) =>{
    res.render('admins/adminpage');
})
router.get('/scanner', (req, res) =>{
    res.render('admins/scanner.ejs');
})

router.get('/showBills', catchAsync(async (req, res) => {
    const students = await Student.find({});
    res.render('./students/bill', {students});
})) 

module.exports = router;