const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const StudentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    regNo: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNo: {
        type: Number,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    depositAmount: {
        type: Number,
        required: true
    },
    records: [{
        month: { type: String },
        amount: { type: Number }
    }],
    meals: {
        type: Number,
        default: 0
    },
    additionalCharges: {
        type: Number,
        default: 0
    } 
})

StudentSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Student', StudentSchema);
