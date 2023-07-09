const Review = require("../models/review.model")
const Event = require("../models/event.model");

const getAll = async (body) => {

    const perPage = body.perPage
    const page = body.page

    let reviews = []

    if (perPage && page){
        reviews = await Review.find({}).limit(perPage).skip(perPage * page)
    }
    else {
        reviews = await Review.find({})
    }

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


const getDetail = async (id) => {
    const review = await Review.findById(id)

    return review
}

module.exports = {
    getAll, deleteOne, createNew, getDetail
}