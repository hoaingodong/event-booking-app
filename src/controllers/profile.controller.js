const profileService = require("../services/profile.service")
const uploadAvatar = async (request, response, next) => {

    const user_id = request.body.user_id
    const file = request.files[0]

    try {
        const savedUser = await profileService.uploadAvatar(user_id, file)
        response.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }
}

const editAvatar = async (request, response, next) => {

    const user_id = request.body.user_id
    const file = request.files[0]

    let savedUser;
    try {
        savedUser = await profileService.deleteAvatar(user_id)
        savedUser = await profileService.uploadAvatar(user_id, file)
        response.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }
}

const deleteAvatar = async (request, response, next) => {

    const user_id = request.body.user_id
    const avatar_id = request.body.avatar_id
    try {
        const savedUser = await profileService.deleteAvatar(user_id, avatar_id)
        response.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }
}

const profileEvent = async (request, response, next) => {
    const id = request.params.id

    try {
        const events = await profileService.profileEvent(id)
        response.status(201).json(events)
    } catch (exception) {
        next(exception)
    }
}

const profileAbout = async (request, response, next) => {
    const id = request.params.id

    try {
        const detailedUser = await profileService.profileAbout(id)
        response.status(201).json(detailedUser)
    } catch (exception) {
        next(exception)
    }
}

const profileReviews = async (request, response, next) => {
    const id = request.params.id

    try {
        const reviews = await profileService.profileReviews(id)
        response.status(201).json(reviews)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
  uploadAvatar, editAvatar, deleteAvatar, profileEvent, profileAbout, profileReviews
}