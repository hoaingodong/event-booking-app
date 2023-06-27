const Joi = require("joi");

const joinEventSchema= Joi.object().keys({
    eventId: Joi.string().required(),
})

module.exports = joinEventSchema