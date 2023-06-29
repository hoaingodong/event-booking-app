const imageService = require("./image.service");
const User = require("../models/user.model")
const cloudinary = require("cloudinary")
const Event = require("../models/event.model");
const Review = require("../models/review.model");

const uploadAvatar = async (user, file) => {

    const avatar = await imageService.createImage(file)

    user.avatar = avatar

    user.save()

    return user
}

const deleteAvatar = async (avatar, user) => {

    if (avatar.id) {
        const result = await cloudinary.uploader
            .destroy(avatar.id)
        if (result.result == "not found") {
            throw new Error("Can not delete your avatar")
        }
    }

    user.avatar = null
    user.save()

    return user
}

const profileEvent = async (id) => {

    const user = await User.findById(id)
    if (!user) {
        throw new Error("User not found")
    }

    const events = await Event.find({organizer: id})

    return events

}

const profileAbout = async (id) => {

    const detailedUser = await User.findById(id)

    if (!detailedUser) {
        throw new Error("User not found")
    }

    return detailedUser
}

const profileReviews = async (id) => {

    const user = await User.findById(id)
    if (!user) {
        throw new Error("User not found")
    }

    const reviews = await Review.find({toUser: id}).populate("fromUser").populate("toUser")
    return reviews
}

const editProfile = async (id, body) => {

    const profile = {
        interests: body.interests,
        bio: body.bio,
        name: body.name
    }

    const savedProfile = await User.findByIdAndUpdate(id, profile, {new: true})
    console.log(savedProfile)

    return savedProfile
}

module.exports = {
    uploadAvatar, deleteAvatar, profileEvent, profileAbout, profileReviews, editProfile
}