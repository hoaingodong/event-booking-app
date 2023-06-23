const inviteFriendsService = require("../services/inviteFriends.service")
const notification = require("../services/PushNotification")
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
    if (!fromUser) {
        response.status(404).json("User not found")
    }


    const eventId = request.body.eventId
    const friends = request.body.friends

    const event = await Event.findById(eventId)

    const title = `${fromUser.name} invite you to ${event.title}`

    const tokenDevices = []
    for (const friend of friends) {
        const toUser = await User.findById(friend)
        tokenDevices.push(toUser.tokenDevice)
    }

    console.log(tokenDevices)

    try {
        await notification.sendNotification(tokenDevices, title)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
    getFriendsList, inviteFriends
}