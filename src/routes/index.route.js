const express = require("express")
const router = express.Router()
const usersRouter = require("./user.route")
const eventRouter = require("./event.route")

router.use("/users", usersRouter)
router.use("/events", eventRouter)

module.exports = router