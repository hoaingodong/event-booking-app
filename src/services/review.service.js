const Review = require("../models/review.model")

const getAll = async () => {

    const reviews = await Review.find({}).populate("fromUser").populate("toUser")

    return reviews
}

const deleteOne = async (id) => {

    const review = await Review.findByIdAndDelete(id)

    return review
}

const createNew = async (body) => {

    const review = {
        fromUser: body.fromUser,
        toUser: body.toUser,
        content: body.content,
        date: body.date,
        stars: body.stars
    }

    const savedReview = await Review.create({...review})

    return savedReview
}

module.exports = {
    getAll, deleteOne, createNew
}