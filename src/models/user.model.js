const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        default: "USER"
    },
    passwordHash: String,
    interest: Array,
    following: Number,
    followers: Number,
    bio: String,
    avatar:	Object,
    verified: {
        type: Boolean,
        default: false
    }
})

userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.passwordHash)
}

userSchema.methods.getJwtToken = async function(){
    return await jwt.sign(
        {id: this._id, username: this.username},
        process.env.SECRET,
        { expiresIn: 60*60 }
    )
}

const User = mongoose.model("User", userSchema)

module.exports = User