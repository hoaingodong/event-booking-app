const express = require("express")
const router = express.Router()
const myEventController = require("../controllers/myEvent.controller")
const {celebrate, Segments} = require("celebrate");
const joinEventSchema = require("../validation/joinEvent.validation")
const Joi = require("joi");

router.post("/", celebrate({[Segments.BODY]:joinEventSchema}), myEventController.createNew)
router.get("/", myEventController.getAll)
router.get("/upcoming-events", celebrate({[Segments.BODY]: {user_id: Joi.string().required()}}), myEventController.getUpcomingEvent)
router.get("/last-events", celebrate({[Segments.BODY]: {user_id: Joi.string().required()}}), myEventController.getLastEvent)

module.exports = router

