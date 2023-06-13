const Joi = require("joi")

const userSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    repeat_password: Joi.ref("password"),
})

module.exports = userSchema