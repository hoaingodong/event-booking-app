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

    const result = await cloudinary.uploader
        .destroy(avatar.id)

    if (result.result == "not found")
        {
            throw new Error("Can not delete your avatar")
        }

    user.avatar = null
    user.save()

    return user
}

const profileEvent = async (id) => {

    const events = await Event.find({user_id: id}).populate("user_id")

    return events

}

const profileAbout = async (id) => {

    const detailedUser = await User.findById(id)
    return detailedUser
}

const profileReviews = async (id) => {

    const reviews = await Review.find({user_id: id}).populate("to_user").populate("from_user")
    return reviews
}

const editProfile = async (id, body) => {

    const profile = {
        interests: body.interests,
        bio: body.bio,
        name: body.name
    }

    const savedProfile = await User.findByIdAndUpdate(id, profile)

    return savedProfile
}

module.exports = {
    uploadAvatar, deleteAvatar, profileEvent, profileAbout, profileReviews, editProfile
}