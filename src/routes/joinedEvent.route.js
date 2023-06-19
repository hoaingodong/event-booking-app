const express = require("express")
const router = express.Router()
const myEventController = require("../controllers/joinedEvent.controller")
const {celebrate, Segments} = require("celebrate");
const joinEventSchema = require("../validation/joinEvent.validation")

router.post("/", celebrate({[Segments.BODY]:joinEventSchema}), myEventController.createNew)
router.get("/all-events/:id", myEventController.getAllEvents)
router.get("/upcoming-events/:id", myEventController.getUpcomingEvent)
router.get("/last-events/:id", myEventController.getLastEvent)
router.get("/all-users/:id", myEventController.getAllUsers)


module.exports = router

