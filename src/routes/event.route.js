const express = require("express")
const router = express.Router()
const eventController = require("../controllers/events.controller")
const filterSchema = require("../validation/filter.validation")
const {celebrate, Segments} = require("celebrate");

router.get("/", eventController.getAll)
router.get("/:id", eventController.getDetail)
router.post("/filter", celebrate({[Segments.BODY]:filterSchema}), eventController.filter)
router.post("/filter-location", eventController.filterLocation)


module.exports = router

