const Review = require("../models/review.model")

const getAll = async () => {
    const reviews = await Review.find({}).populate("from_user").populate("to_user")
    return reviews
}

const deleteOne = async (id) => {

    const review = await Review.findByIdAndDelete(id)

    return review
}

module.exports = {
    getAll, deleteOne
}