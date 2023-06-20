const Joi = require("joi");

const eventSchema = Joi.object().keys({
    title: Joi.string().required(),
    topics: Joi.array().items(Joi.string()),
    price: Joi.number().required(),
    introduction: Joi.string().required(),
    started_date: Joi.date().required(),
    ended_date:Joi.date().required(),
    user_id: Joi.string()
})

module.exports = eventSchema