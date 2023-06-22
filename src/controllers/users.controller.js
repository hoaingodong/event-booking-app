const userService = require("../services/user.service")
const bcrypt = require("bcryptjs")
const {request, response} = require("express");

const createNew = async (request, response, next) => {

    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = {
        name: body.name,
        email: body.email,
        role: body.role,
        passwordHash,
    }

    try {
        const savedUser = await userService.createNew(user)
        response.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }
}

const verifyOTP = async (request, response, next) =>{
    const body = request.body
    try {
        const result  = await userService.verifyOTP(body.otp, body.email)
        response.status(200).json({token: result.token})
    } catch (exception) {
        next(exception)
    }
}

const login = async(request, response, next) =>{
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
    const user = request.user

    try {
        const savedUser = await userService.resetPassword(user, body.password)
        response.status(200).json(savedUser)
    } catch (exception) {
        next(exception)
    }
}

const getAll = async (request, response, next) => {
    try {
        const user = await userService.getAll()
        response.status(200).json(user)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
    createNew, verifyOTP, login, forgotPassword, resetPassword, getAll
}