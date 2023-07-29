const mongoose = require('mongoose');
const Student = require('../models/students');

module.exports.getStudents = async(arr) => {
    let students = [];
    for (let s of arr) {
        let stud = await Student.findById(s);
        students.push(stud);
    }
    return students;
}