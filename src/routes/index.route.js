const express = require("express")
const router = express.Router()
const meRouter = require("./me.route")
const eventRouter = require("./event.route")
const reviewRouter = require("./review.route")
const userRouter = require("./user.route")

router.use("/me", meRouter)
router.use("/events", eventRouter)
router.use("/reviews", reviewRouter)
router.use("/users", userRouter)

module.exports = router