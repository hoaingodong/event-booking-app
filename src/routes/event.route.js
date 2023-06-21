const express = require("express")
const router = express.Router()
const eventController = require("../controllers/events.controller")
const filterSchema = require("../validation/filter.validation")
const {celebrate, Segments} = require("celebrate");
const Joi = require("joi");
const locationSchema = require('../validation/location.validation')
const upload = require("../config/multer.config")
const eventSchema = require("../validation/event.validation")
const middleware = require("../utils/middleware");

router.get("/", celebrate({[Segments.QUERY]:filterSchema}), eventController.filter)
router.get("/nearby", celebrate({[Segments.QUERY]:locationSchema}),  eventController.filterLocation)
router.get("/search", celebrate({[Segments.QUERY]: {keyword: Joi.string()}}), eventController.search)
router.get("/:id", eventController.getDetail)
router.use(middleware.tokenValidator)
router.delete("/:id", eventController.deleteOne)
router.post("/", upload.upload.any(), celebrate({[Segments.BODY]:eventSchema}), eventController.createNew)
router.put("/:id", upload.upload.any(), celebrate({[Segments.BODY]:eventSchema}), eventController.update)
router.post("/image/:id", upload.upload.any(), eventController.uploadImage)
router.delete("/image/:id", eventController.deleteImage)

module.exports = router

