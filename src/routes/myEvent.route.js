const express = require("express")
const router = express.Router()
const myEventController = require("../controllers/myEvent.controller")
const {celebrate, Segments} = require("celebrate");
const joinEventSchema = require("../validation/joinEvent.validation")
const Joi = require("joi");

router.post("/", celebrate({[Segments.BODY]:joinEventSchema}), myEventController.createNew)
router.get("/:id", myEventController.getAll)
router.get("/upcoming-events:/id", myEventController.getUpcomingEvent)
router.get("/last-events:/id", myEventController.getLastEvent)

module.exports = router

