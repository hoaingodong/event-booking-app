const Joi = require("joi");

const locationSchema = Joi.object().keys({
    longitude: [
        Joi.number().required(),
        Joi.number().required()
    ],
    latitude: [
        Joi.number().required(),
        Joi.number().required()
    ]
})

module.exports = locationSchema