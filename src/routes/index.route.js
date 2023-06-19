const express = require("express")
const router = express.Router()
const usersRouter = require("./user.route")
const eventRouter = require("./event.route")
const joinedEventRouter = require("./joinedEvent.route")
const profileRouter = require("./profile.route")
const inviteFriendsRouter = require("./inviteFriends.route")

router.use("/users", usersRouter)
router.use("/events", eventRouter)
router.use("/joined-events", joinedEventRouter)
router.use("/profile", profileRouter)
router.use("/invite-friends", inviteFriendsRouter)

module.exports = router