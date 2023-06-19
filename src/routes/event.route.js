const express = require("express")
const router = express.Router()
const eventController = require("../controllers/events.controller")
const filterSchema = require("../validation/filter.validation")
const {celebrate, Segments} = require("celebrate");
const Joi = require("joi");
const locationSchema = require('../validation/location.validation')

router.get("/", eventController.getAll)
router.get("/:id", eventController.getDetail)
router.post("/filter", celebrate({[Segments.BODY]:filterSchema}), eventController.filter)
router.post("/filter-location", celebrate({[Segments.BODY]:locationSchema}),  eventController.filterLocation)
router.post("/search", celebrate({[Segments.BODY]: {keyword: Joi.string().required()}}), eventController.search)

module.exports = router

