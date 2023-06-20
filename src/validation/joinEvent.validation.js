const Joi = require("joi");

const joinEventSchema= Joi.object().keys({
    event_id: Joi.string().required(),
})

module.exports = joinEventSchema