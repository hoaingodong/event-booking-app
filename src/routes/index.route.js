const express = require("express")
const router = express.Router()
const usersRouter = require("./user.route")
const eventRouter = require("./event.route")
const reviewRouter = require("./review.route")
const googleAuthRouter = require("./googleAuth.route")
const facebookAuthRouter = require("./facebookAuth.route")

router.use("/users", usersRouter)
router.use("/events", eventRouter)
router.use("/reviews", reviewRouter)
router.use("/auth", googleAuthRouter, facebookAuthRouter)

module.exports = router