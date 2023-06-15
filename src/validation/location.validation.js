const Joi = require("joi");

const locationSchema = Joi.object().keys({
    longitude: Joi.string().required(),
    latitude: Joi.string().required()
})

module.exports = locationSchema