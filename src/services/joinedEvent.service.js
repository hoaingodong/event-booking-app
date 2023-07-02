const JoinedEvent = require("../models/joinedEvent.model")
const User = require("../models/user.model")
const Event = require("../models/event.model")

const createNew = async (userId, eventId) => {

    const user = await User.findById(userId)
    if (!user){
        throw new Error("User not found")
    }
    const event = await Event.findById(eventId)
    if (!event){
        throw new Error("Event not found")
    }

    const myEvent = {
        user: userId,
        event: eventId
    }

    const savedMyEvent = await JoinedEvent.create({...myEvent})
    return savedMyEvent
}

const getAllEvents = async (userId) => {

    const user = await User.findById(userId)
    if (!user){
        throw new Error("User not found")
    }

    const myEvents = await JoinedEvent.find({user: userId}).populate("event")
    return myEvents
}

const getUpcomingEvent = async (userId) => {

    const user = await User.findById(userId)
    if (!user){
        throw new Error("User not found")
    }
    const myEvents = await JoinedEvent.find({user: userId}).populate("event")

    const myUpcomingEvents = await myEvents.filter(element => element.event?.startDate > Date.now())

    return myUpcomingEvents
}

const getLastEvent = async (userId) => {

    const user = await User.findById(userId)
    if (!user){
        throw new Error("User not found")
    }
    const myEvents = await JoinedEvent.find({user: userId}).populate("event")

    const myLastEvents = await myEvents.filter(element => element.event?.startDate < Date.now())

    return myLastEvents
}

const getAllUsers = async (eventId) => {

    const event = await Event.findById(eventId)
    if (!event){
        throw new Error("Event not found")
    }

    const users = await JoinedEvent.find({event: eventId}).populate("user")
    const totalUser = await JoinedEvent.find({event: eventId}).populate("user").count()

    return {users, totalUser}
}

module.exports = {
    createNew, getAllEvents, getUpcomingEvent, getLastEvent, getAllUsers
}