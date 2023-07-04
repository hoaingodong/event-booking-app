const Joi = require("joi");
const {now} = require("mongoose");

const filterSchema= Joi.object().keys({
    topics: Joi.array().items(Joi.string()),
    date: Joi.date(),
    address: Joi.string(),
    minPrice: Joi.number(),
    maxPrice: Joi.number(),
    maxDate: Joi.date(),
    minDate: Joi.date(),
    thisDate: Joi.date(),
    longitude: [
        Joi.number(),
        Joi.string()
    ],
    latitude: [
        Joi.number(),
        Joi.string()
    ],
    keyword: Joi.string()
})

module.exports = filterSchema