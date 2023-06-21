const Joi = require("joi");

const locationSchema = Joi.object().keys({
    longitude: [
        Joi.number().required(),
        Joi.string().required()
    ],
    latitude: [
        Joi.number().required(),
        Joi.string().required()
    ]
})

module.exports = locationSchema