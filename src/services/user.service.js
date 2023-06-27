const User = require("../models/user.model")
const emailService = require("./email.service")
const NodeCache = require( "node-cache" );
const bcrypt = require("bcryptjs");
const myCache = new NodeCache();

const createNew = async (user) => {
    const savedUser = await User.create({...user})
    const otp = generateOTP()
    await emailService.sendEmail(savedUser.email, otp)
    myCache.set(`OTP${savedUser.id}`, otp, 300);
    return savedUser
}

const verifyOTP = async (otp, email) => {
    const user = await User.findOne({email})

    if (!user){
        throw new Error("You haven't registered with this email")
    }

    if (user.verified == true){
        throw new Error("Account already activated")
    }

    const result = otp ==  await myCache.get(`OTP${user.id}`)

    if (result == false){
        throw new Error("Wrong OTP or OTP was expired")
    }

    user.verified = true
    user.save()

    const token = await user.getJwtToken()

    return {user, token}
}

const login = async (body) => {
    const user = await User.findOne({ email: body.email })

    if (!user){
        throw new Error("You haven't registered with this email")
    }

    if (user.verified == false){
        throw new Error("Your account has not been activated")
    }

    const passwordCorrect = user === null
        ? false
        : await user.comparePassword(body.password)

    if (!(user && passwordCorrect)) {
        throw new Error("Invalid username or password")
    }

    const token = await user.getJwtToken()

    user.tokenDevice = body.tokenDevice
    user.save()

    return {token, user}
}

const generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

const forgotPassword = async (email) => {
    const user = await User.findOne({email})

    if (!user){
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

    if (user.verified == false){
        throw new Error("Your account has not been activated")
    }

    if (!user){
        throw new Error("You haven't registered with this email")
    }

    const saltRounds = 10
    const newPassword = await bcrypt.hash(password, saltRounds)
    user.passwordHash = newPassword
    await user.save()

    return user
}

const getAll = async () => {
    const users = await User.find({})

    return users
}

const getFriendsList = async (id) => {
    console.log(id)
    const friends = User.find({_id: {$ne: id}})
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