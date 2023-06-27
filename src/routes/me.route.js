const express = require("express")
const userController = require("../controllers/users.controller")
const userSchema = require("../validation/user.validation")
const otpSchema = require("../validation/otp.validation")
const loginSchema = require("../validation/login.validation")
const Joi = require("joi")
const resetSchema = require("../validation/resetPassword.validation")
const inviteFriendsController = require("../controllers/inviteFriends.controller")
const joinedEventController = require("../controllers/joinedEvent.controller")
const joinEventSchema = require("../validation/joinEvent.validation")
const profileController = require("../controllers/profile.controller")
const router = express.Router()
const upload = require("../config/multer.config")
const profileSchema = require("../validation/profile.validation")
const {celebrate, Segments} = require("celebrate")
const middleware = require("../utils/middleware")

//authentication
router.post("/register", celebrate({[Segments.BODY]:userSchema}), userController.createNew)
router.post("/verify-otp", celebrate({[Segments.BODY]:otpSchema}), userController.verifyOTP)
router.post("/login", celebrate({[Segments.BODY]:loginSchema}), userController.login)
router.post("/send-otp", celebrate({[Segments.BODY]: {email: Joi.string().email().required()}}), userController.forgotPassword)
router.post("/reset-password", middleware.authJwt(), celebrate({[Segments.BODY]:resetSchema}), userController.resetPassword)
//get lists friends
router.get("/friends", middleware.authJwt(), inviteFriendsController.getFriendsList)
router.post("/invite-friends", middleware.authJwt(), inviteFriendsController.inviteFriends)
//join events
router.post("/join-event", middleware.authJwt(), celebrate({[Segments.BODY]:joinEventSchema}), joinedEventController.createNew)
router.get("/events", middleware.authJwt(), joinedEventController.getAllEvents)
router.get("/upcoming-events", middleware.authJwt(), joinedEventController.getUpcomingEvent)
router.get("/last-events", middleware.authJwt(), joinedEventController.getLastEvent)
//my-profile
router.post("/avatar", middleware.authJwt(), upload.upload.any(), profileController.uploadAvatar)
router.delete("/avatar", middleware.authJwt(), profileController.deleteAvatar)
router.put("/", middleware.authJwt(), celebrate({[Segments.BODY]:profileSchema}), profileController.editProfile)

module.exports = router

