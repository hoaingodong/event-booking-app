const {now} = require("mongoose");
const inviteFriendsService = require("../services/user.service")
const notificationService = require("../services/notification.service")
const Event = require("../models/event.model")
const User = require("../models/user.model")

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
        "fromUser": fromUser,
        "content": body,
        "date": Date(now()),
        "action": ""
    }

    const tokenDevices = []
    for (const friend of friends) {
        const toUser = await User.findById(friend)
        if (toUser.tokenDevice) {
            tokenDevices.push(toUser.tokenDevice)
        }

    }

    try {
        await notificationService.sendNotification(tokenDevices, body, data)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
    getFriendsList, inviteFriends
}