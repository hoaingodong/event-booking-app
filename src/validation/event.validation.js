const Joi = require("joi")

const updateEventSchema = Joi.object().keys({
    id: Joi.string(),
    title: Joi.string().required(),
    topics: Joi.array().items(Joi.string()).required(),
    price: Joi.number().required(),
    introduction: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate:Joi.date().required(),
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

const createEventSchema = updateEventSchema.keys({
        organizer: Joi.string().required()
    }
)

exports.createEventSchema = createEventSchema
exports.updateEventSchema = updateEventSchema