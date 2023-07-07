const reviewService = require("../services/review.service")

const getAll = async (request, response, next) => {

    try {
        const reviews = await reviewService.getAll()
        response.status(200).json(reviews)
    } catch (exception) {
        next(exception)
    }
}

const deleteOne = async (request, response, next) => {
    const id = request.params.id

    try {
        await reviewService.deleteOne(id)
        response.status(204).json()
    } catch (exception) {
        next(exception)
    }
}

const createNew = async (request, response, next) => {
    const body = request.body

    try {
        const review = await reviewService.createNew(body)
        response.status(201).json(review)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
    getAll, deleteOne, createNew
}