const Notification = require("../models/notification")
const User = require("../models/user.model");

const createNew = async (notification) => {

    const savedNotification = await Notification.create({...notification})

    return savedNotification
}

const deleteOne = async (id) => {

    const notification = await Notification.findByIdAndDelete(id)

    return notification
}

const getNotifications = async (id) => {

    const user = await User.findById(id)

    if (!user) {
        throw new Error("User not found")
    }

    const notifications = await Notification.find({toUser: id}).populate("fromUser")

    return notifications
}

const findOne = async (id) => {

    const notification = await Notification.findById(id)

    return notification
}

module.exports = {
    createNew, getNotifications, deleteOne, findOne
}