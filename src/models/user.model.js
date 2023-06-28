const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const findOrCreate = require("mongoose-findorcreate");


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
    interests: Array,
    following: {
        type: Number,
        default: 0
    },
    followers: {
        type: Number,
        default: 0
    },
    bio: String,
    avatar:	Object,
    verified: {
        type: Boolean,
        default: false
    },
    tokenDevice: String
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
    return jwt.sign(
        {id: this._id, username: this.username},
        process.env.SECRET    );
}

userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema)

module.exports = User