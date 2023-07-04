const profileService = require("../services/profile.service")
const User = require("../models/user.model")

const uploadAvatar = async (request, response, next) => {

    const id = request.user.id
    const user = await User.findById(id)

    if (!user) {
        response.status(404).json("User not found")
    }

    if (user.avatar){
        response.status(400).json({error: "Avatar have already exists"})
    }

    const file = request.files[0]

    try {
        const savedUser = await profileService.uploadAvatar(user, file)
        response.status(200).json(savedUser)
    } catch (exception) {
        next(exception)
    }
}

const deleteAvatar = async (request, response, next) => {

    const id = request.user.id
    const user = await User.findById(id)

    if (!user) {
        response.status(404).json("User not found")
    }

    const avatar =  user.avatar
    if (!avatar){
        response.status(404).json({error: "Avatar not found"})
    }
    try {
        const savedUser = await profileService.deleteAvatar(avatar, user)
        response.status(200).json(savedUser)
    } catch (exception) {
        next(exception)
    }
}

const profileEvent = async (request, response, next) => {
    const id = request.params.id

    try {
        const events = await profileService.profileEvent(id)
        response.status(200).json(events)
    } catch (exception) {
        next(exception)
    }
}

const profileAbout = async (request, response, next) => {
    const id = request.params.id

    try {
        const detailedUser = await profileService.profileAbout(id)
        response.status(200).json(detailedUser)
    } catch (exception) {
        next(exception)
    }
}

const profileReviews = async (request, response, next) => {
    const id = request.params.id

    try {
        const reviews = await profileService.profileReviews(id)
        response.status(200).json(reviews)
    } catch (exception) {
        next(exception)
    }
}

const editProfile = async (request, response, next) => {
    const id = request.user.id
    const body =  request.body

    try {
        const savedUser = await profileService.editProfile(id, body)
        response.status(200).json(savedUser)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
  uploadAvatar, deleteAvatar, profileEvent, profileAbout, profileReviews, editProfile
}