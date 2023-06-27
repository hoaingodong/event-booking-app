const inviteFriendsService = require("../services/user.service")
const notificationService = require("../services/notification.service")
const Event = require("../models/event.model")
const User = require("../models/user.model")
const {now} = require("mongoose");

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
    console.log(fromUser)

    const eventId = request.body.eventId
    console.log(eventId)
    const friends = request.body.friends
    console.log(friends)
    const event = await Event.findById(eventId)
    console.log(event)
    if (!event) {
        response.status(404).json({error: "Event not found"})
    }

    const body = `${fromUser.name} invite you to ${event.title}`
    const data = {
        "from_user": fromUser,
        "content": body,
        "date": Date(now()),
        "action": ""
    }
    console.log(data)

    const tokenDevices = []
    for (const friend of friends) {
        const toUser = await User.findById(friend)
        if (toUser.tokenDevice){
            tokenDevices.push(toUser.tokenDevice)
        }

    }

    console.log(tokenDevices)

    try {
        await notificationService.sendNotification(tokenDevices, body, data)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
    getFriendsList, inviteFriends
}