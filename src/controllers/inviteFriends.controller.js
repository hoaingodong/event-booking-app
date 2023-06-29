const {now} = require("mongoose");
const inviteFriendsService = require("../services/user.service")
const notificationService = require("../services/notification.service")
const Event = require("../models/event.model")
const User = require("../models/user.model")
const myEventService = require("../services/joinedEvent.service")

const getFriendsList = async (request, response, next) => {
    const id = request.user.id
    try {
        const friends = await inviteFriendsService.getFriendsList(id)
        response.status(200).json(friends)
    } catch (exception) {
        next(exception)
    }
}

const inviteFriends = async (request, response, next) => {

    const id = request.user.id
    const fromUser = await User.findById(id)

    const eventId = request.body.eventId
    const friends = request.body.friends
    const event = await Event.findById(eventId)
    if (!event) {
        response.status(404).json({error: "Event not found"})
    }

    const body = `${fromUser.name} invite you to ${event.title}`
    const data = {
        fromUser: String(id),
        content: body,
        date: String(Date(now())),
    }

    try {
        for (const friend of friends) {
            const toUser = await User.findById(friend)
            if (toUser.tokenDevice) {
                console.log(toUser.tokenDevice)
                await notificationService.sendNotification(String(toUser.tokenDevice), body, data)}
            }

    } catch (exception) {
        next(exception)
    }
}

const acceptJoiningEvent = async (request, response, next) => {
    const id = request.user.id
    const fromUser = await User.findById(id)
    const eventId = request.body.eventId
    const event = await Event.findById(eventId)
    if (!event) {
        response.status(404).json({error: "Event not found"})
    }
    const toUser = await User.findById(event.organizer)

    const body = `${fromUser.name} join your event: ${event.title}`
    const data = {
        fromUser: String(id),
        content: body,
        date: String(Date(now())),
    }

    try {
        await myEventService.createNew(id, eventId)
        await notificationService.sendNotification(String(toUser.tokenDevice), body, data)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
    getFriendsList, inviteFriends, acceptJoiningEvent
}