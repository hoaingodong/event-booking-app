const profileService = require("../services/profile.service")
const uploadAvatar = async (request, response, next) => {

    const user_id = request.params.id
    const file = request.files[0]

    try {
        const savedUser = await profileService.uploadAvatar(user_id, file)
        response.status(200).json(savedUser)
    } catch (exception) {
        next(exception)
    }
}

const editAvatar = async (request, response, next) => {

    const user_id = request.params.id
    const file = request.files[0]

    let savedUser;
    try {
        savedUser = await profileService.deleteAvatar(user_id)
        savedUser = await profileService.uploadAvatar(user_id, file)
        response.status(200).json(savedUser)
    } catch (exception) {
        next(exception)
    }
}

const deleteAvatar = async (request, response, next) => {

    const user_id = request.params.id
    try {
        const savedUser = await profileService.deleteAvatar(user_id)
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
    const id = request.params.id
    const body =  request.body

    try {
        const reviews = await profileService.editProfile(id, body)
        response.status(200).json(reviews)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
  uploadAvatar, editAvatar, deleteAvatar, profileEvent, profileAbout, profileReviews, editProfile
}