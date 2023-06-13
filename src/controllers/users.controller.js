const userService = require("../services/user.service")
const bcrypt = require("bcryptjs")

const createNew = async (request, response, next) => {

    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = {
        name: body.name,
        email: body.email,
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
        await userService.verifyOTP(body.otp, body.email)
        response.status(200).json("Verify OTP successfully")
    } catch (exception) {
        next(exception)
    }
}

const login = async(request, response, next) =>{
    const body = request.body
    try {
        const user = await userService.login(body.email, body.password)
        response.status(200).json(user)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
    createNew, verifyOTP, login
}