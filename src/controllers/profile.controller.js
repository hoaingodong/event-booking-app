const profileService = require("../services/profile.service")
const uploadAvatar = async (request, response, next) => {

    const user = request.user
    const file = request.files[0]

    try {
        const savedUser = await profileService.uploadAvatar(user, file)
        response.status(200).json(savedUser)
    } catch (exception) {
        next(exception)
    }
}

const editAvatar = async (request, response, next) => {

    const user = request.user
    const avatar =  request.user.avatar
    if (!avatar){
        response.status(404).json({error: "Avatar not found"})
    }
    const file = request.files[0]

    let savedUser;
    try {
        savedUser = await profileService.deleteAvatar(avatar, user)
        savedUser = await profileService.uploadAvatar(user, file)
        response.status(200).json(savedUser)
    } catch (exception) {
        next(exception)
    }
}

const deleteAvatar = async (request, response, next) => {

    const user = request.user
    const avatar =  request.user.avatar
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
    const id = request.user.id

    try {
        const events = await profileService.profileEvent(id)
        response.status(200).json(events)
    } catch (exception) {
        next(exception)
    }
}

const profileAbout = async (request, response, next) => {
    const id = request.user.id

    try {
        const detailedUser = await profileService.profileAbout(id)
        response.status(200).json(detailedUser)
    } catch (exception) {
        next(exception)
    }
}

const profileReviews = async (request, response, next) => {
    const id = request.user.id

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
  uploadAvatar, editAvatar, deleteAvatar, profileEvent, profileAbout, profileReviews, editProfile
}