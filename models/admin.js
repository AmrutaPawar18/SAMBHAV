const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
    meals: {
        type: Number,
        default: 0
    },
    activeStudents: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

AdminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Admin', AdminSchema);
