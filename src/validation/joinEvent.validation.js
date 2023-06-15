const Joi = require("joi");

const joinEventSchema= Joi.object().keys({
    user_id: Joi.string().required(),
    event_id: Joi.string().required(),
})

module.exports = joinEventSchema