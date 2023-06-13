const Joi = require("joi");

const loginSchema= Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
})

module.exports = loginSchema