const express = require("express")
const router = express.Router()
const myEventController = require("../controllers/myEvent.controller")
const {celebrate, Segments} = require("celebrate");
const joinEventSchema = require("../validation/joinEvent.validation")

router.post("/", celebrate({[Segments.BODY]:joinEventSchema}), myEventController.createNew)
router.get("/", myEventController.getAll)
router.get("/upcoming-events", myEventController.getUpcomingEvent)
router.get("/last-events", myEventController.getLastEvent)

module.exports = router

