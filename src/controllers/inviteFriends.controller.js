const {now} = require("mongoose");
const inviteFriendsService = require("../services/user.service")
const notificationService = require("../services/notification.service")
const Event = require("../models/event.model")
const User = require("../models/user.model")
const myEventService = require("../services/joinedEvent.service")
const notificationsService = require("../services/notifications.service")
const JoinedEvent = require("../models/joinedEvent.model");

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
        fromUser: id,
        content: body,
        date: Date(now()),
        eventId: event.id
    }
    console.log(data)

    try {
        for (const friend of friends) {
            const toUser = await User.findById(friend)
            //push notification for token device
            if (toUser.tokenDevice) {
                console.log(toUser.tokenDevice)
                await notificationService.sendNotification(String(toUser.tokenDevice), body, data)
            }
            //save notification into Database
            const notification = {
                toUser: toUser,
                fromUser: fromUser,
                content: body,
                date: Date.now(),
                type: "INVITE",
                event: event
            }
            await notificationsService.createNew(notification)
            response.status(200).json({message: "invite successfully"})
            }

    } catch (exception) {
        next(exception)
    }
}

const acceptJoiningEvent = async (request, response, next) => {
    const userId = request.user.id
    const notificationId = request.params.id

    const notification = await notificationsService.findOne(notificationId)

    const fromUser = await User.findById(userId)
    const event = await Event.findById(notification.event)
    if (!event) {
        response.status(404).json({error: "Event not found"})
    }
    const toUser = await User.findById(event.organizer)

    const body = `${fromUser.name} join your ${event.title}`
    const data = {
        fromUser: userId,
        content: body,
        date: Date(now()),
        eventId: event.id
    }

    try {
        const duplicatedJoinedEvent = await JoinedEvent.findOne({$and: [{user: userId}, {event: event.id}]})
        if (!duplicatedJoinedEvent) {
            await myEventService.createNew(userId, event.id)
        }

        //if toUser have token device -> delete this notification and push the another one
        if (toUser.tokenDevice) {
            await notificationService.sendNotification(String(toUser.tokenDevice), body, data)
        }

        await notificationsService.deleteOne(notificationId)

        const notification = {
            toUser: toUser,
            fromUser: fromUser,
            content: body,
            date: Date.now()
        }
        const savedNotification = await notificationsService.createNew(notification)
        response.status(200).json(savedNotification)

    } catch (exception) {
        next(exception)
    }
}

const getNotifications = async (request, response, next) => {
    const id = request.user.id

    try {
        const notifications = await notificationsService.getNotifications(id)
        response.status(200).json(notifications)
    } catch (exception) {
        next(exception)
    }
}

const deleteOne = async (request, response, next) => {
    const id = request.params.id

    try {
        const notification = await notificationsService.deleteOne(id)
        response.status(204).json(notification)
    } catch (exception) {
        next(exception)
    }
}

const rejectJoiningEvent = async (request, response, next) => {
    const userId = request.user.id
    const notificationId = request.params.id

    const notification = await notificationsService.findOne(notificationId)

    const fromUser = await User.findById(userId)
    const event = await Event.findById(notification.event)
    if (!event) {
        response.status(404).json({error: "Event not found"})
    }
    const toUser = await User.findById(notification.fromUser)

    const body = `${fromUser.name} reject your invitation to ${event.title}`
    const data = {
        fromUser: userId,
        content: body,
        date: Date(now()),
        eventId: event.id
    }

    try {
        await myEventService.createNew(userId, event.id)
        //if toUser have token device -> delete this notification and push the another one
        if (toUser.tokenDevice) {
            await notificationService.sendNotification(String(toUser.tokenDevice), body, data)
        }

        await notificationsService.deleteOne(notificationId)

        const notification = {
            toUser: toUser,
            fromUser: fromUser,
            content: body,
            date: Date.now()
        }
        const savedNotification = await notificationsService.createNew(notification)
        response.status(200).json(savedNotification)

    } catch (exception) {
        next(exception)
    }
}



module.exports = {
    getFriendsList, inviteFriends, acceptJoiningEvent, getNotifications, deleteOne, rejectJoiningEvent
}