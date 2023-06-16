const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const eventSchema = mongoose.Schema({
    title: String,
    price: Number,
    image: Object,
    introduction: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    topics: Array,
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number]
        }
    },
    address: String,
    started_date: Date,
    ended_date: Date
})

eventSchema.plugin(uniqueValidator)

eventSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

eventSchema.index({ location: "2dsphere" });

const Event = mongoose.model("Event", eventSchema)

module.exports = Event