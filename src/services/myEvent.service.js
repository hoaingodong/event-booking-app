const MyEvent = require("../models/myEvent.model")
const User = require("../models/user.model")
const Event = require("../models/event.model")

const createNew = async (user_id, event_id) => {

    const user = await User.findById(user_id)
    if (!user){
        throw new Error("User not found")
    }
    const event = await Event.findById(event_id)
    if (!event){
        throw new Error("Event not found")
    }

    const myEvent = {
        users: user_id,
        events: event_id
    }

    const savedMyEvent = await MyEvent.create({...myEvent})
    return savedMyEvent
}

const getAll = async (user_id) => {

    const user = await User.findById(user_id)
    if (!user){
        throw new Error("User not found")
    }

    const myEvents = await MyEvent.find({user: user_id}).populate("event")
    return myEvents
}

const getUpcomingEvent = async (user_id) => {

    const user = await User.findById(user_id)
    if (!user){
        throw new Error("User not found")
    }
    const myEvents = await MyEvent.find({user: user_id}).populate("event")

    const myUpcomingEvents = await myEvents.filter(element => element.events.started_date > Date.now())

    return myUpcomingEvents
}

const getLastEvent = async (user_id) => {

    const user = await User.findById(user_id)
    if (!user){
        throw new Error("User not found")
    }
    const myEvents = await MyEvent.find({user: user_id}).populate("event")

    const myLastEvents = await myEvents.filter(element => element.event.started_date < Date.now())

    return myLastEvents
}

module.exports = {
    createNew, getAll, getUpcomingEvent, getLastEvent
}