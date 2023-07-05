const Joi = require("joi");

const loginSchema= Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    tokenDevice: Joi.string()
})

const resetPasswordSchema = Joi.object().keys({
        password: Joi.string().min(4).required(),
        repeat_password: Joi.ref("password"),
    }
)

const otpSchema= Joi.object().keys({
    otp: Joi.string().required(),
    email: Joi.string().email().required(),
})

exports.loginSchema = loginSchema
exports.resetPasswordSchema = resetPasswordSchema
exports.otpSchema = otpSchema