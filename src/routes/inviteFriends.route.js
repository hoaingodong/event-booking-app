const express = require("express")
const router = express.Router()
const notificationController = require("../controllers/inviteFriends.controller")

router.get("/get-friends-list/:id", notificationController.getFriendsList)
router.post("/send-invitations/:id", notificationController.sendInvitations)

module.exports = router

