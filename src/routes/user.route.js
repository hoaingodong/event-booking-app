const express = require("express")
const userController = require("../controllers/users.controller")
const userSchema = require("../validation/user.validation")
const otpSchema = require("../validation/otp.validation")
const loginSchema = require("../validation/login.validation")
const Joi = require("joi");
const resetSchema = require("../validation/resetPassword.validation")
const notificationController = require("../controllers/inviteFriends.controller")
const joinedEventController = require("../controllers/joinedEvent.controller")
const joinEventSchema = require("../validation/joinEvent.validation")
const profileController = require("../controllers/profile.controller");
const router = express.Router()
const upload = require("../config/multer.config")
const profileSchema = require("../validation/profile.validation")
const {celebrate, Segments} = require("celebrate");

router.post("/register", celebrate({[Segments.BODY]:userSchema}), userController.createNew)
router.post("/verify-otp", celebrate({[Segments.BODY]:otpSchema}), userController.verifyOTP)
router.post("/login", celebrate({[Segments.BODY]:loginSchema}), userController.login)
router.post("/send-email-reset-password", celebrate({[Segments.BODY]: {email: Joi.string().email().required()}}), userController.sendEmailResetPassword)
router.post("/reset-password", celebrate({[Segments.BODY]:resetSchema}), userController.resetPassword)
router.get("/", userController.getAll)
//get lists friends
router.get("/friends/:id", notificationController.getFriendsList)
//join events
router.post("/join-event", celebrate({[Segments.BODY]:joinEventSchema}), joinedEventController.createNew)
router.get("/:id/events", joinedEventController.getAllEvents)
router.get("/:id/upcoming-events", joinedEventController.getUpcomingEvent)
router.get("/:id/last-events", joinedEventController.getLastEvent)
//profile
router.post("/upload-avatar/:id", upload.upload.any(), profileController.uploadAvatar)
router.post("/edit-avatar/:id", upload.upload.any(), profileController.editAvatar)
router.delete("/delete-avatar/:id", profileController.deleteAvatar)
router.get("/profile-event/:id", profileController.profileEvent)
router.get("/profile-about/:id", profileController.profileAbout)
router.get("/profile-reviews/:id", profileController.profileReviews)
router.put("/:id", celebrate({[Segments.BODY]:profileSchema}), profileController.editProfile)

module.exports = router

