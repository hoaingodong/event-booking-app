const express = require("express")
const router = express.Router()
const eventController = require("../controllers/events.controller")
const filterSchema = require("../validation/filter.validation")
const {celebrate, Segments} = require("celebrate");
const Joi = require("joi");
const locationSchema = require('../validation/location.validation')
const joinedEventController = require("../controllers/joinedEvent.controller");
const upload = require("../config/multer.config")

router.get("/", celebrate({[Segments.QUERY]:filterSchema}), eventController.filter)
router.get("/nearby", celebrate({[Segments.QUERY]:locationSchema}),  eventController.filterLocation)
router.get("/search", celebrate({[Segments.QUERY]: {keyword: Joi.string()}}), eventController.search)
router.get("/:id", eventController.getDetail)
router.delete("/:id", eventController.deleteOne)
router.post("/", upload.upload.any(), eventController.createNew)

module.exports = router

