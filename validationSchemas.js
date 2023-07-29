const Joi = require('joi');

module.exports.studentSchema = Joi.object({
    student:Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        regNo: Joi.number().required(),
        contactNo: Joi.number().required(),
        gender: Joi.string().required(),
        year: Joi.number().required(),
        depositAmount: Joi.number().required(),
    }).required()
});