const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const RecordSchema = new Schema({
    month: String,
    amount: Number
})

const StudentSchema = new Schema({
    name: {
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
    records: RecordSchema,
    guests: {
        type: Number
    },
    monthlyTotal: Number
})

StudentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Student', StudentSchema);