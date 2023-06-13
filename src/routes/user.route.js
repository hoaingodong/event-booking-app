const express = require("express")
const router = express.Router()
const userController = require("../controllers/users.controller")
const { celebrate, Segments} = require("celebrate")
const userSchema = require("../validation/user.validation")
const otpSchema = require("../validation/otp.validation")
const loginSchema = require("../validation/login.validation")

router.post("/register", celebrate({[Segments.BODY]:userSchema}), userController.createNew)
router.post("/verify-otp", celebrate({[Segments.BODY]:otpSchema}), userController.verifyOTP)
router.post("/login", celebrate({[Segments.BODY]:loginSchema}), userController.login)

module.exports = router

