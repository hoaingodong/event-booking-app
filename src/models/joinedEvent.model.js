const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const joinedEventSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }
})

joinedEventSchema.plugin(uniqueValidator)

joinedEventSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const JoinedEvent = mongoose.model("JoinedEvent", joinedEventSchema)

module.exports = JoinedEvent