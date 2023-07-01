const express = require("express")
const router = express.Router()
const userController = require("../controllers/users.controller")
const profileController = require("../controllers/profile.controller")

//get all users
router.get("/", userController.getAll)
//organizer profile
router.get("/:id/profile/events/", profileController.profileEvent)
router.get("/:id/profile/about", profileController.profileAbout)
router.get("/:id/profile/reviews", profileController.profileReviews)

module.exports = router

