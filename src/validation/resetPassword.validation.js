const Joi = require("joi");

const resetSchema = Joi.object().keys(
    {
        password: Joi.string().min(4).required(),
        repeat_password: Joi.ref("password"),
        email: Joi.string().email().required()
    }
)

module.exports = resetSchema