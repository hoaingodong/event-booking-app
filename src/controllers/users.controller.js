const userService = require("../services/user.service")
const User = require("../models/user.model");
const eventService = require("../services/event.service");

const createNew = async (request, response, next) => {

    const body = request.body

    try {
        const savedUser = await userService.createNew(body)
        response.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }
}

const verifyOTP = async (request, response, next) => {
    const body = request.body
    try {
        const result = await userService.verifyOTP(body.otp, body.email)
        response.status(200).json(result)
    } catch (exception) {
        next(exception)
    }
}

const login = async (request, response, next) => {
    const body = request.body
    try {
        const user = await userService.login(body)
        response.status(200).json(user)
    } catch (exception) {
        next(exception)
    }
}

const forgotPassword = async (request, response, next) => {
    const body = request.body
    try {
        const user = await userService.forgotPassword(body.email)
        response.status(200).json(user)
    } catch (exception) {
        next(exception)
    }
}

const resetPassword = async (request, response, next) => {
    const body = request.body
    const id = request.user.id
    const user = await User.findById(id)
    if (!user) {
        response.status(404).json("User not found")
    }

    try {
        const savedUser = await userService.resetPassword(user, body.password)
        response.status(200).json(savedUser)
    } catch (exception) {
        next(exception)
    }
}

const getAll = async (request, response, next) => {
    const body = request.query

    try {
        const users = await userService.getAll(body)
        response.status(200).json(users)
    } catch (exception) {
        next(exception)
    }
}

const loginAdmin = async (request, response, next) => {
    const body = request.body
    try {
        const user = await userService.loginAdmin(body)
        response.status(200).json(user)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
    createNew, verifyOTP, login, forgotPassword, resetPassword, getAll, loginAdmin
}