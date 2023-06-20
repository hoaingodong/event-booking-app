const notification = require("../services/inviteFriends.service")

const getFriendsList = async (request, response, next) => {
    const id = request.user.id
    try {
        const friends = await notification.getFriendsList(id)
        response.status(200).json(friends)
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
    getFriendsList
}