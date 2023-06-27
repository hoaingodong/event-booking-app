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
router.get("/all", celebrate({[Segments.QUERY]:filterSchema}), eventController.getAll)
router.get("/nearby", celebrate({[Segments.QUERY]:locationSchema}),  eventController.filterLocation)
router.get("/search", celebrate({[Segments.QUERY]: {keyword: Joi.string()}}), eventController.search)
router.get("/:id", eventController.getDetail)
router.delete("/:id", middleware.authJwt(), eventController.deleteOne)
router.post("/", middleware.authJwt(), upload.upload.any(), celebrate({[Segments.BODY]:eventSchema}), eventController.createNew)
router.put("/:id", middleware.authJwt(), upload.upload.any(), celebrate({[Segments.BODY]:eventSchema}), eventController.update)
router.post("/:id/image", middleware.authJwt(), upload.upload.any(), eventController.uploadImage)
router.delete("/:id/image", middleware.authJwt(), eventController.deleteImage)

module.exports = router

