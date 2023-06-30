const Joi = require("joi")

const userSchema = Joi.object().keys({
    name: Joi.string().required().min(4),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    repeat_password: Joi.ref("password"),
    role: Joi.string().valid('ADMIN', 'USER', "ORGANIZER")
})

module.exports = userSchema