const myEventService = require("../services/joinedEvent.service")

const createNew = async (request, response, next) => {

    const user_id = request.body.user_id
    const event_id = request.body.event_id

    try {
        const savedMyEvent = await myEventService.createNew(user_id, event_id)
        response.status(201).json(savedMyEvent)
    } catch (exception) {
        next(exception)
    }
}

const getAllEvents = async (request, response, next) => {

    const id = request.params.id
    try {
        const myEvents = await myEventService.getAllEvents(id)
        response.status(200).json(myEvents)
    } catch (exception) {
        next(exception)
    }
}

const getUpcomingEvent = async (request, response, next) => {

    const id = request.params.id

    try {
        const myUpcomingEvents = await myEventService.getUpcomingEvent(id)
        response.status(200).json(myUpcomingEvents)
    } catch (exception) {
        next(exception)
    }
}

const getLastEvent = async (request, response, next) => {

    const id = request.params.id

    try {
        const myLastEvents = await myEventService.getLastEvent(id)
        response.status(200).json(myLastEvents)
    } catch (exception) {
        next(exception)
    }
}

const getAllUsers = async (request, response, next) => {

    const id = request.params.id
    try {
        const users = await myEventService.getAllUsers(id)
        response.status(200).json(users)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
    createNew, getAllEvents, getUpcomingEvent, getLastEvent, getAllUsers
}