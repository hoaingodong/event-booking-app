const myEventService = require("../services/myEvent.service")

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

const getAll = async (request, response, next) => {

    const user_id = request.body.user_id

    try {
        const myEvents = await myEventService.getAll(user_id)
        response.status(201).json(myEvents)
    } catch (exception) {
        next(exception)
    }
}

const getUpcomingEvent = async (request, response, next) => {

    const user_id = request.body.user_id

    try {
        const myUpcomingEvents = await myEventService.getUpcomingEvent(user_id)
        response.status(201).json(myUpcomingEvents)
    } catch (exception) {
        next(exception)
    }
}

const getLastEvent = async (request, response, next) => {

    const user_id = request.body.user_id

    try {
        const myLastEvents = await myEventService.getLastEvent(user_id)
        response.status(201).json(myLastEvents)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
    createNew, getAll, getUpcomingEvent, getLastEvent
}