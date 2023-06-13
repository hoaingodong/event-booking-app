const Joi = require("joi");

const otpSchema= Joi.object().keys({
    otp: Joi.string().required(),
    email: Joi.string().email().required(),
})

module.exports = otpSchema