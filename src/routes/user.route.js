const express = require("express")
const router = express.Router()
const {celebrate, Segments} = require("celebrate")
const {expressjwt: jwt} = require("express-jwt")
const Joi = require("joi")
const userController = require("../controllers/users.controller")
const userSchema = require("../validation/user.validation")
const otpSchema = require("../validation/otp.validation")
const loginSchema = require("../validation/login.validation")
const resetSchema = require("../validation/resetPassword.validation")
const inviteFriendsController = require("../controllers/inviteFriends.controller")
const joinedEventController = require("../controllers/joinedEvent.controller")
const joinEventSchema = require("../validation/joinEvent.validation")
const profileController = require("../controllers/profile.controller")
const upload = require("../config/multer.config")
const profileSchema = require("../validation/profile.validation")


//authentication
router.post("/register", celebrate({[Segments.BODY]:userSchema}), userController.createNew)
router.post("/verify-otp", celebrate({[Segments.BODY]:otpSchema}), userController.verifyOTP)
router.post("/login", celebrate({[Segments.BODY]:loginSchema}), userController.login)
router.post("/send-otp", celebrate({[Segments.BODY]: {email: Joi.string().email().required()}}), userController.forgotPassword)
router.post("/reset-password", jwt({ secret: "hoaingodong", algorithms: ["HS256"], requestProperty: "user" }), celebrate({[Segments.BODY]:resetSchema}), userController.resetPassword)
router.get("/", userController.getAll)
//organizer profile
router.get("/profile/events/:id", profileController.profileEvent)
router.get("/profile/about/:id", profileController.profileAbout)
router.get("/profile/reviews/:id", profileController.profileReviews)
//get lists friends
router.get("/friends", jwt({ secret: "hoaingodong", algorithms: ["HS256"], requestProperty: "user" }), inviteFriendsController.getFriendsList)
router.post("/invite-friends", jwt({ secret: "hoaingodong", algorithms: ["HS256"], requestProperty: "user" }), inviteFriendsController.inviteFriends)
//join events
router.post("/join-event", jwt({ secret: "hoaingodong", algorithms: ["HS256"], requestProperty: "user" }), celebrate({[Segments.BODY]:joinEventSchema}), joinedEventController.createNew)
router.get("/events", jwt({ secret: "hoaingodong", algorithms: ["HS256"], requestProperty: "user" }), joinedEventController.getAllEvents)
router.get("/upcoming-events", jwt({ secret: "hoaingodong", algorithms: ["HS256"], requestProperty: "user" }), joinedEventController.getUpcomingEvent)
router.get("/last-events", jwt({ secret: "hoaingodong", algorithms: ["HS256"], requestProperty: "user" }), joinedEventController.getLastEvent)
//my-profile
router.post("/avatar", jwt({ secret: "hoaingodong", algorithms: ["HS256"], requestProperty: "user" }), upload.upload.any(), profileController.uploadAvatar)
router.delete("/avatar", jwt({ secret: "hoaingodong", algorithms: ["HS256"], requestProperty: "user" }), profileController.deleteAvatar)
router.put("/", jwt({ secret: "hoaingodong", algorithms: ["HS256"], requestProperty: "user" }), celebrate({[Segments.BODY]:profileSchema}), profileController.editProfile)

module.exports = router

