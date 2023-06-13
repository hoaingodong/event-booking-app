const User = require("../models/user.model")
const emailService = require("./email.service")
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const createNew = async (user) => {
    const savedUser = await User.create({...user})
    const otp = generateOTP()
    await emailService.sendEmail(savedUser.email, otp)
    myCache.set(`OTP${savedUser.id}`, otp, 300);
    return savedUser
}

const verifyOTP = async (otp, email) => {
    // find email was registerd or not
    const user = await User.findOne({email:email})
    if (!user){
        throw new Error("You haven't register with this email")
    }

    //check OTP
    const result = otp == myCache.get(`OTP${user.id}`)
    console.log(result)
    if (result == false){
        throw new Error("Wrong OTP or OTP was expired")
    }

    //change verified status
    user.verified = true
    user.save()

    return user, result
}

const generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

module.exports = {
    createNew, verifyOTP
}