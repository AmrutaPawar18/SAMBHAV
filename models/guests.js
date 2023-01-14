const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const GuestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    regNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    images: [
        {
            url: String,
            filename: String
        }
    ]
})

module.exports = mongoose.model('Guest', GuestSchema);