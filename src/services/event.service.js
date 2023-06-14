const Event = require("../models/event.model")

const getAll = async () => {
    const events = await Event.find({})
    return events
}

const getDetail = async (id) => {
    const event = await Event.findById(id)
    return event
}

const filter = async (body) => {
    let events = await Event.find({})

    if (body.topics) {
        events = events.filter(element => element.topics.some(item=> body.topics.includes(item)))
    }
    if (body.minPrice) {
        events = events.filter(element => element.price >= body.minPrice)
    }
    if (body.maxPrice) {
        events = events.filter(element => element.price <= body.maxPrice)
    }
    if (body.minDate){
        events = events.filter(element => element.started_date >= body.minDate)
    }
    if (body.maxDate){
        events = events.filter(element => element.started_date >= body.maxDate)
    }

    return events
}

module.exports = {
    getAll, getDetail, filter
}