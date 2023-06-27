const Review = require("../models/review.model")

const getAll = async () => {
    const reviews = await Review.find({}).populate("fromUser").populate("toUser")
    return reviews
}

const deleteOne = async (id) => {

    const review = await Review.findByIdAndDelete(id)

    return review
}

module.exports = {
    getAll, deleteOne
}