const mongoose = require('mongoose');
const Student = require('../models/students');

const date = new Date();
const month = date.getMonth();
const day = date.getDate();

const deductAmount = async (objectId) => {
    const user = await Student.findById(objectId);
    user.depositAmount = user.depositAmount - 98;
    user.monthlyTotal = user.monthlyTotal + 98;
    if (user.guests>0){
        user.depositAmount = user.depositAmount - 98*(user.guests);
        user.monthlyTotal = user.monthlyTotal + 98*(user.guests);
    }
    user.records = { month: month, amount: monthlyTotal};
    await user.save();
}

module.exports = deductAmount;