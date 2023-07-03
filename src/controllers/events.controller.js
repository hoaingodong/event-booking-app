const eventService = require("../services/event.service")
const imageService = require("../services/image.service");
const User = require("../models/user.model");

const getAll = async (request, response, next) => {
    try {
        const events = await eventService.getAll()
        response.status(200).json(events)
    } catch (exception) {
        next(exception)
    }
}

const getDetail = async (request, response, next) => {
    const id = request.params.id

    try {
        const event = await eventService.getDetail(id)
        if (event) {
            response.status(200).json(event)
        } else {
            return response.status(404).json({error: "Event not found"})
        }
    } catch (exception) {
        next(exception)
    }
}

const filter = async (request, response, next) => {
    const body = request.query

    try {
        const events = await eventService.filter(body)
        if (events) {
            response.status(200).json(events)
        } else {
            return response.status(404).json({error: "Event not found"})
        }
    } catch (exception) {
        next(exception)
    }
}

const filterLocation = async (request, response, next) => {
    const body = request.query
    const longitude = parseFloat(body.longitude)
    const latitude = parseFloat(body.latitude)
    try {
        const events = await eventService.filterLocation(longitude, latitude)
        if (events) {
            response.status(200).json(events)
        } else {
            return response.status(404).json({error: "Event not found"})
        }
    } catch (exception) {
        next(exception)
    }
}

const search = async (request, response, next) => {
    const body = request.query

    try {
        const events = await eventService.search(body)
        if (events) {
            response.status(200).json(events)
        } else {
            return response.status(404).json({error: "Event not found"})
        }
    } catch (exception) {
        next(exception)
    }
}

const deleteOne = async (request, response, next) => {
    const id = request.params.id
    try {
        await eventService.deleteOne(id)
        response.status(204).json()
    } catch (exception) {
        next(exception)
    }
}

const createNew = async (request, response, next) => {
    const body = request.body
    try {
        const file = request.files[0]
        const image = await imageService.createImage(file)

        const coordinates = {
            longitude: body.longitude,
            latitude: body.latitude
        }

        const location = {
            coordinates: coordinates
        }

        const event = {
            title: body.title,
            topics: body.topics,
            price: body.price,
            introduction: body.introduction,
            image: image,
            startDate: body.startDate,
            endDate: body.endDate,
            organizer: body.organizer,
            address: body.address,
            location: location
        }

        const user = await User.findById(body.organizer)
        if (!user) {
            response.status(401).json({error: "Invalid user"})
        }

        try {
            const savedEvent = await eventService.createNew(event, coordinates)
            response.status(201).json(savedEvent)
        } catch (exception) {
            next(exception)
        }
    } catch (exception) {
        next(exception)
    }
}

const update = async (request, response, next) => {

    const id = request.params.id
    const body = request.body

    try {
        const savedEvent = await eventService.update(id, body)
        response.status(200).json(savedEvent)
    } catch (exception) {
        next(exception)
    }
}

const uploadImage = async (request, response, next) => {

    const id = request.params.id
    const event = await eventService.getDetail(id)

    if (event.image) {
        response.status(400).json({error: "Image have already exists"})
    }

    const file = request.files[0]

    try {
        const savedEvent = await eventService.uploadImage(event, file)
        response.status(200).json(savedEvent)
    } catch (exception) {
        next(exception)
    }
}

const deleteImage = async (request, response, next) => {

    const id = request.params.id
    const event = await eventService.getDetail(id)

    const image = event.image

    if (!image) {
        response.status(404).json({error: "Image not found"})
    }
    try {
        const savedEvent = await eventService.deleteImage(image, event)
        response.status(200).json(savedEvent)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
    getAll, getDetail, filter, filterLocation, search, deleteOne, createNew, update, uploadImage, deleteImage
}