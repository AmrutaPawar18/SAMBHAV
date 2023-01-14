const mongoose = require('mongoose');
const Student = require('../models/students');

const generateBill = async (objectId) => {
    const user = await Student.findById(objectId)
    return (user.depositAmount - user.monthlyTotal);
}

module.exports = generateBill;