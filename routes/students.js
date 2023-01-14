const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/expressErrors');
const Student = require('../models/students');
const flash= require('connect-flash');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});


router.get('/register',  (req, res) => {
    res.render('students/new');
});
router.get('/home',(req,res)=>{
    res.render('students/home')
})
router.get('/guest',(req,res)=>{
    res.render('students/guest')
})
router.post('/register', catchAsync(async(req, res, next) => {
    if (req.body.student) 
    {    
        const student = new Student(req.body.student);
        await student.save();
        res.send('Registration successful');
    }
    else {
        throw new ExpressError('Invalid Student Data', 400)
    }
}));

/* router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
 */

router.get('/login', (req, res) => {
    res.render('students/login');
})

module.exports.login= (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/students/home';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/students/login' }, Student.login));


router.get('/:id/paymentHistory', catchAsync(async (req, res) => {
    const { id } = req.params;
    const student = await Student.findById(id);
    res.render('./students/paymentHistory', {student});
}))

module.exports = router;
