const mongoose =require('mongoose');
const passport = require('passport')
const passportLocal = require('passport-local');
const passportMongoose = require('passport-local-mongoose');

const Adminsd = require('./admin_seeds');
const Admin = require('../models/admin');

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
  mongoose.connect('mongodb://localhost:27017/hostel-mess', options, ()=>{
    console.log('heyy database!!')
  });

  const seedDB = async()=>{
  await Admin.deleteMany({});
  for(let i=0;i<2;i++) {
    username = Adminsd[i].username;
    email = Adminsd[i].email,
    password = Adminsd[i].password;
    const user = new Admin({username, email});
    await Admin.register(user, password);
  }
}

seedDB();