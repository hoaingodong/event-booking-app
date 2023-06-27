const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const reviewSchema = mongoose.Schema({
    content: String,
    stars: Number,
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: Date
})

reviewSchema.plugin(uniqueValidator)

reviewSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review