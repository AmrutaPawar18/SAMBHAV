const Joi = require('joi');

module.exports.studentSchema = Joi.object({
    name:Joi.object({
    email: Joi.string().required(),
    regNo: Joi.number().required(),
    contactNo: Joi.number().required(),
    gender: Joi.string().required(),
    year: Joi.number().required(),
    depositAmount: Joi.number().required(),
    guests: Joi.number().min(0),
    monthlyTotal: Joi.number().min(0)
    //image
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})