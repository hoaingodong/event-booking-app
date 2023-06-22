const express = require("express")
const userController = require("../controllers/users.controller")
const userSchema = require("../validation/user.validation")
const otpSchema = require("../validation/otp.validation")
const loginSchema = require("../validation/login.validation")
const Joi = require("joi");
const resetSchema = require("../validation/resetPassword.validation")
const inviteFriendsController = require("../controllers/inviteFriends.controller")
const joinedEventController = require("../controllers/joinedEvent.controller")
const joinEventSchema = require("../validation/joinEvent.validation")
const profileController = require("../controllers/profile.controller");
const router = express.Router()
const upload = require("../config/multer.config")
const profileSchema = require("../validation/profile.validation")
const {celebrate, Segments} = require("celebrate");
const middleware =  require("../utils/middleware")

//auth
router.post("/register", celebrate({[Segments.BODY]:userSchema}), userController.createNew)
router.post("/verify-otp", celebrate({[Segments.BODY]:otpSchema}), userController.verifyOTP)
router.post("/login", celebrate({[Segments.BODY]:loginSchema}), userController.login)
router.post("/send-otp", celebrate({[Segments.BODY]: {email: Joi.string().email().required()}}), userController.forgotPassword)
router.post("/reset-password", middleware.tokenValidator, middleware.userExtractor, celebrate({[Segments.BODY]:resetSchema}), userController.resetPassword)
router.get("/", userController.getAll)
//organizer profile
router.get("/profile/events/:id", profileController.profileEvent)
router.get("/profile/about/:id", profileController.profileAbout)
router.get("/profile/reviews/:id", profileController.profileReviews)

router.use(middleware.tokenValidator, middleware.userExtractor)

//get lists friends
router.get("/friends", inviteFriendsController.getFriendsList)
router.post("/invite-friends", inviteFriendsController.inviteFriends)
//join events
router.post("/join-event", celebrate({[Segments.BODY]:joinEventSchema}), joinedEventController.createNew)
router.get("/events", joinedEventController.getAllEvents)
router.get("/upcoming-events", joinedEventController.getUpcomingEvent)
router.get("/last-events", joinedEventController.getLastEvent)
//my-profile
router.post("/avatar", upload.upload.any(), profileController.uploadAvatar)
router.delete("/avatar", profileController.deleteAvatar)
router.put("/", celebrate({[Segments.BODY]:profileSchema}), profileController.editProfile)

module.exports = router

