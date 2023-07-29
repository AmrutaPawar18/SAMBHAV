const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const Student = require('../models/students');
const catchAsync = require('../utilities/catchAsync');
const admins = require('../controllers/admin');
const { isAdminLoggedIn } = require('../middleware');

const passport = require('passport').Passport;
const adminPassport = new passport();
const localStrategy = require('passport-local');

router.use(adminPassport.initialize());
router.use(adminPassport.session());
adminPassport.use(new localStrategy(Admin.authenticate()));
adminPassport.serializeUser(Admin.serializeUser());
adminPassport.deserializeUser(Admin.deserializeUser());

router.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

router.get('/home', isAdminLoggedIn, catchAsync(admins.renderHome));

router.get('/login', catchAsync(admins.renderLogin));

router.post('/login', adminPassport.authenticate('local', { failureFlash: true, failureRedirect: '/admin/login'}), admins.AdminLogin)

router.get('/logout', admins.AdminLogout);

router.get('/adminpage', isAdminLoggedIn, catchAsync(admins.renderAdminPage));

router.post('/addStudent', isAdminLoggedIn, catchAsync(admins.AddStudent));

router.get('/viewStudents', isAdminLoggedIn, catchAsync(admins.ViewStudents));

router.get('/defaulters', isAdminLoggedIn, catchAsync(admins.ViewDefaulters));

router.get('/generateBill', isAdminLoggedIn, catchAsync(admins.GenerateBill));

router.put('/calculate', isAdminLoggedIn, catchAsync(admins.CalculateMeal));

router.put('/generateBill', isAdminLoggedIn, catchAsync(admins.CalculateBill));

router.get('/sendWarningMail', isAdminLoggedIn, catchAsync(admins.SendWarningMail));

router.post('/:id/checkout', isAdminLoggedIn, catchAsync(admins.HandleCheckout));

router.get('/:id/profile', isAdminLoggedIn, catchAsync(admins.StudentProfile));

module.exports = router;