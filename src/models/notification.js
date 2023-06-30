const mongoose = require("mongoose")

const notificationSchema = mongoose.Schema({
    content: String,
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    date: Date,
    type: String
})

notificationSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Notification = mongoose.model("Notification", notificationSchema)

module.exports = Notification