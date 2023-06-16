const express = require("express")
const router = express.Router()
const usersRouter = require("./user.route")
const eventRouter = require("./event.route")
const myEventRouter = require("./myEvent.route")
const profileRouter = require("./profile.route")

router.use("/users", usersRouter)
router.use("/events", eventRouter)
router.use("/my-events", myEventRouter)
router.use("/profile", profileRouter)

module.exports = router