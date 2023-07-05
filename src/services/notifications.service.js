const Notification = require("../models/notification")
const User = require("../models/user.model");
const {CustomError} = require("../utils/CustomError");

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
        throw new CustomError("User not found", 404)
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