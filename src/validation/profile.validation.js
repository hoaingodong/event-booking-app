const Joi = require("joi");

const profileSchema = Joi.object().keys({
    bio: Joi.string().required(),
    interests: Joi.array().items(Joi.string()).required(),
    name: Joi.string().required()
})

module.exports = profileSchema