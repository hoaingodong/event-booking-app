const JoinedEvent = require("../models/joinedEvent.model")
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
        user: user_id,
        event: event_id
    }

    const savedMyEvent = await JoinedEvent.create({...myEvent})
    return savedMyEvent
}

const getAllEvents = async (user_id) => {

    const user = await User.findById(user_id)
    if (!user){
        throw new Error("User not found")
    }

    const myEvents = await JoinedEvent.find({user: user_id}).populate("event")
    return myEvents
}

const getUpcomingEvent = async (user_id) => {

    const user = await User.findById(user_id)
    if (!user){
        throw new Error("User not found")
    }
    const myEvents = await JoinedEvent.find({user: user_id}).populate("event")

    const myUpcomingEvents = await myEvents.filter(element => element.event.started_date > Date.now())

    return myUpcomingEvents
}

const getLastEvent = async (user_id) => {

    const user = await User.findById(user_id)
    if (!user){
        throw new Error("User not found")
    }
    const myEvents = await JoinedEvent.find({user: user_id}).populate("event")

    const myLastEvents = await myEvents.filter(element => element.event.started_date < Date.now())

    return myLastEvents
}

const getAllUsers = async (event_id) => {

    const event = await Event.findById(event_id)
    if (!event){
        throw new Error("Event not found")
    }

    const users = await JoinedEvent.find({event: event_id}).populate("user")
    const totalUser = await JoinedEvent.find({event: event_id}).populate("user").count()

    return {users, totalUser}
}

module.exports = {
    createNew, getAllEvents, getUpcomingEvent, getLastEvent, getAllUsers
}