const User = require("../models/user.model")

const getFriendsList = async (id) => {
    console.log(id)
    const friends = User.find({_id: {$ne: id}})
    return friends
}

module.exports = {
    getFriendsList
}