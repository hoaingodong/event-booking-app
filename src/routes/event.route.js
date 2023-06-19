const express = require("express")
const router = express.Router()
const eventController = require("../controllers/events.controller")
const filterSchema = require("../validation/filter.validation")
const {celebrate, Segments} = require("celebrate");
const Joi = require("joi");
const locationSchema = require('../validation/location.validation')
const joinedEventController = require("../controllers/joinedEvent.controller");

router.get("/", eventController.getAll)
router.get("/detail/:id", eventController.getDetail)
router.get("/search", eventController.search)

router.get("/filter", celebrate({[Segments.BODY]:filterSchema}), eventController.filter)
router.get("/filter-location", celebrate({[Segments.BODY]:locationSchema}),  eventController.filterLocation)
//get all users have join each event
router.get("/:id/users", joinedEventController.getAllUsers)

module.exports = router

