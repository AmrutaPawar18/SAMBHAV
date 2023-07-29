const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const Joi = require('joi');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportMongoose = require('passport-local-mongoose');
const nodemailer = require('nodemailer');

const catchAsync = require('./utilities/catchAsync');
const ExpressErrors = require('./utilities/expressErrors');

const Student = require('./models/students');
const Admin = require('./models/admin');

const studentRoutes = require('./routes/students');
const adminRoutes = require('./routes/admin');

const options = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};

mongoose.connect('mongodb://localhost:27017/hostel-mess', options, () => {
    console.log("Connected to database")
})

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
       httpOnly: true,  
       expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
       maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(bodyParser.urlencoded({extended : true}));

app.use((req, res, next) => {
    console.log(req.session)
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/students', studentRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.render('home');
  })   

app.all('*', (req, res, next) => {
    next(new ExpressErrors('Page not found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500} = err;
    if (!err.message) err.message = "Something went wrong!";  
    res.status(statusCode).render('error', {err});
})

app.listen(7018, () => {
    console.log('Serving on port 7018');
})