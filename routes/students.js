const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/expressErrors');
const Student = require('../models/students');
const flash= require('connect-flash');
const students = require('../controllers/students');
const { isLoggedIn } = require('../middleware');

const passport = require('passport').Passport;
const studentPassport = new passport();
const localStrategy = require('passport-local');

router.use(studentPassport.initialize());
router.use(studentPassport.session());
studentPassport.use(new localStrategy(Student.authenticate()));
studentPassport.serializeUser(Student.serializeUser());
studentPassport.deserializeUser(Student.deserializeUser());

router.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

router.get('/intermediate', catchAsync(students.renderIntermediate));

router.get('/register',  catchAsync(students.renderRegister));

router.post('/register', catchAsync(students.register));

router.get('/home', isLoggedIn, catchAsync(students.renderHome));

router.get('/login', catchAsync(students.renderLogin));

router.post('/login', studentPassport.authenticate('local', { failureFlash: true, failureRedirect: '/students/login' }), students.login);

router.get('/logout', students.logout);

router.get('/profile', isLoggedIn, catchAsync(students.Profile));

router.get('/history', isLoggedIn, catchAsync(students.History));

module.exports = router;
