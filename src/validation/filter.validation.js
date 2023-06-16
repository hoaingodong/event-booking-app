const Joi = require("joi");
const {now} = require("mongoose");

const filterSchema= Joi.object().keys({
    topics: Joi.array().items(Joi.string()),
    date: Joi.date(),
    address: Joi.string(),
    minPrice: Joi.number(),
    maxPrice: Joi.number(),
    minDate: Joi.date().greater(now()),
    maxDate: Joi.date().greater(now()),
    longitude: [
        Joi.number().required(),
        Joi.number().required()
    ],
    latitude: [
        Joi.number().required(),
        Joi.number().required()
    ]
})

module.exports = filterSchema