const express = require("express")
const router = express.Router()
const usersRouter = require("./user.route")
const eventRouter = require("./event.route")
const myEventRouter = require("./myEvent.route")

router.use("/users", usersRouter)
router.use("/events", eventRouter)
router.use("/my-events", myEventRouter)

module.exports = router