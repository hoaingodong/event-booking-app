const express = require("express")
const router = express.Router()
const userController = require("../controllers/users.controller")
const userSchema = require("../validation/user.validation")
const otpSchema = require("../validation/otp.validation")
const loginSchema = require("../validation/login.validation")
const Joi = require("joi");
const resetSchema = require("../validation/resetPassword.validation")
const notificationController = require("../controllers/inviteFriends.controller")
const joinedEventController = require("../controllers/joinedEvent.controller")
const {celebrate, Segments} = require("celebrate");
const joinEventSchema = require("../validation/joinEvent.validation")

router.post("/register", celebrate({[Segments.BODY]:userSchema}), userController.createNew)
router.post("/verify-otp", celebrate({[Segments.BODY]:otpSchema}), userController.verifyOTP)
router.post("/login", celebrate({[Segments.BODY]:loginSchema}), userController.login)
//forgot password - nhập vào email thui (kiểm tra đã verified otp đợt đầu hay chưa) - gửi otp cho email - nhập otp - nhập password, confirmpassword ->ok
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



module.exports = router

