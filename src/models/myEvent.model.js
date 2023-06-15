const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const myEventSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }
})

myEventSchema.plugin(uniqueValidator)

myEventSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const MyEvent = mongoose.model("MyEvent", myEventSchema)

module.exports = MyEvent