const Joi = require("joi");

const reviewSchema = Joi.object().keys({
    fromUser: Joi.string().required(),
    toUser: Joi.string().required(),
    content: Joi.string().required(),
    stars: Joi.number().required(),
    date: Joi.date().required()
})

module.exports = reviewSchema