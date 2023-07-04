const NodeCache = require("node-cache");
const myCache = new NodeCache();
const User = require("../models/user.model")
const emailService = require("./email.service")

const createNew = async (body) => {

    const user = {
        name: body.name,
        email: body.email,
        role: body.role
    }

    const savedUser = await User.create({...user})
    savedUser.passwordHash = await savedUser.hashPassword(body.password)
    savedUser.save()

    const otp = generateOTP()
    await emailService.sendEmail(savedUser.email, otp)
    myCache.set(`OTP${savedUser.id}`, otp, 300);

    return savedUser
}

const verifyOTP = async (otp, email) => {

    const user = await User.findOne({email})

    if (!user) {
        throw new Error("You haven't registered with this email")
    }

    if (user.verified == true) {
        throw new Error("Account already activated")
    }

    const result = otp == await myCache.get(`OTP${user.id}`)

    if (result == false) {
        throw new Error("Wrong OTP or OTP was expired")
    }

    user.verified = true
    user.save()

    const token = await user.getJwtToken()

    return {user, token}
}

const login = async (body) => {

    const user = await User.findOne({email: body.email})

    if (!user) {
        throw new Error("You haven't registered with this email")
    }

    if (user.verified == false) {
        throw new Error("Your account has not been activated")
    }

    const passwordCorrect = user === null
        ? false
        : await user.comparePassword(body.password)

    if (!(user && passwordCorrect)) {
        throw new Error("Invalid email or password")
    }

    const token = await user.getJwtToken()

    user.tokenDevice = body.tokenDevice
    user.save()

    if (body.tokenDevice) {
        console.log(body.tokenDevice)
        const duplicatedToken = await User.findOne({$and: [{tokenDevice: {$exists: true}}, {tokenDevice: String(body.tokenDevice)}, {_id: {$ne: user.id}}]})
        if (duplicatedToken){
            duplicatedToken.tokenDevice = ""
            duplicatedToken.save()
        }
    }

    return {token, user}
}

const generateOTP = () => {

    const digits = '0123456789';

    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }

    return OTP;
}

const forgotPassword = async (email) => {

    const user = await User.findOne({email})

    if (!user) {
        throw new Error("You haven't registered with this email")
    }

    user.verified = false
    await user.save()

    const otp = generateOTP()
    await emailService.sendEmail(user.email, otp)
    myCache.set(`OTP${user.id}`, otp, 20);

    return user
}

const resetPassword = async (user, password) => {

    if (!user) {
        throw new Error("You haven't registered with this email")
    }

    if (user.verified == false) {
        throw new Error("Your account has not been activated")
    }

    if (await user.comparePassword(password)) {
        throw new Error("Duplicate password, please enter the new one")
    }

    const newPassword = await user.hashPassword(password)
    user.passwordHash = newPassword
    await user.save()

    return user
}

const getAll = async () => {

    const users = await User.find({})

    return users
}

const getFriendsList = async (id) => {

    const friends = User.find({_id: {$ne: id}, verified: true})

    return friends
}

module.exports = {
    createNew,
    verifyOTP,
    login,
    forgotPassword,
    resetPassword,
    getAll,
    getFriendsList
}