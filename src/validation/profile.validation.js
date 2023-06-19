const Joi = require("joi");

const profileSchema = Joi.object().keys({
    bio: Joi.string().required(),
    interests: Joi.array().items(Joi.string()),
})

module.exports = profileSchema