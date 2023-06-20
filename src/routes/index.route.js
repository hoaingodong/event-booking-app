const express = require("express")
const router = express.Router()
const usersRouter = require("./user.route")
const eventRouter = require("./event.route")
const middleware = require("../utils/middleware")

router.use(middleware.tokenExtractor)
router.use("/users", usersRouter)
router.use(middleware.tokenValidator)
router.use("/events", eventRouter)

module.exports = router