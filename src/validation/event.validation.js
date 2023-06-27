const Joi = require("joi");

const eventSchema = Joi.object().keys({
    title: Joi.string().required(),
    topics: Joi.array().items(Joi.string()),
    price: Joi.number().required(),
    introduction: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate:Joi.date().required(),
    organizer: Joi.string().required(),
    longitude: [
        Joi.number().required(),
        Joi.string().required()
    ],
    latitude: [
        Joi.number().required(),
        Joi.string().required()
    ],
    address: Joi.string().required()
})

module.exports = eventSchema