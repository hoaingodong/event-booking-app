const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const eventSchema = mongoose.Schema({
    title: String,
    price: Number,
    image: Object,
    introduction: String,
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    topics: Array,
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            longitude: Number,
            latitude: Number
        }
    },
    address: String,
    startDate: Date,
    endDate: Date
})

eventSchema.plugin(uniqueValidator)

eventSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

eventSchema.index({ location: "2dsphere" });

const Event = mongoose.model("Event", eventSchema)

module.exports = Event