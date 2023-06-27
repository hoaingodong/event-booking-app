const {expressjwt: jwt} = require("express-jwt")
const userController = require("../controllers/users.controller");
const profileController = require("../controllers/profile.controller");
const express = require("express")
const router = express.Router()
var { expressjwt: jwt } = require("express-jwt");

router.get("/", userController.getAll)
//organizer profile
router.get("/profile/events", profileController.profileEvent)
router.get("/:id/profile/about", profileController.profileAbout)
router.get("/:id/profile/reviews", profileController.profileReviews)

module.exports = router