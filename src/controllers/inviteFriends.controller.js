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

    const fromUser = request.user
    const eventId = request.body.eventId
    const friends = request.body.friends

    const event = await Event.findById(eventId)

    const title = `${fromUser.name} invite you to ${event.title}`

    for (const friend of friends) {
        try {
            const toUser = await User.findById(friend)
            await notification.sendNotification(toUser.tokenDevice, title)
        } catch (exception) {
            next(exception)
        }
    }
}

module.exports = {
    getFriendsList, inviteFriends
}