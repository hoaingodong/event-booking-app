const myEventService = require("../services/joinedEvent.service")

const createNew = async (request, response, next) => {

    const userId = request.user.id
    const eventId = request.body.eventId

    try {
        const savedMyEvent = await myEventService.createNew(userId, eventId)
        response.status(201).json(savedMyEvent)
    } catch (exception) {
        next(exception)
    }
}

const getAllEvents = async (request, response, next) => {

    const userId = request.user.id
    try {
        const myEvents = await myEventService.getAllEvents(userId)
        response.status(200).json(myEvents)
    } catch (exception) {
        next(exception)
    }
}

const getUpcomingEvent = async (request, response, next) => {

    const userId = request.user.id

    try {
        const myUpcomingEvents = await myEventService.getUpcomingEvent(userId)
        response.status(200).json(myUpcomingEvents)
    } catch (exception) {
        next(exception)
    }
}

const getLastEvent = async (request, response, next) => {

    const userId = request.user.id

    try {
        const myLastEvents = await myEventService.getLastEvent(userId)
        response.status(200).json(myLastEvents)
    } catch (exception) {
        next(exception)
    }
}

const getAllUsers = async (request, response, next) => {

    const eventId = request.params.id
    try {
        const users = await myEventService.getAllUsers(eventId)
        response.status(200).json(users)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
    createNew, getAllEvents, getUpcomingEvent, getLastEvent, getAllUsers
}