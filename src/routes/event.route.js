const express = require("express")
const router = express.Router()
const {expressjwt: jwt} = require("express-jwt");
const {celebrate, Segments} = require("celebrate");
const Joi = require("joi");
const eventController = require("../controllers/events.controller")
const filterSchema = require("../validation/filter.validation")
const locationSchema = require('../validation/location.validation')
const upload = require("../config/multer.config")
const eventSchema = require("../validation/event.validation")
const joinedEventController = require("../controllers/joinedEvent.controller")

router.get("/", celebrate({[Segments.QUERY]:filterSchema}), eventController.filter)
router.get("/all", celebrate({[Segments.QUERY]:filterSchema}), eventController.getAll)
router.get("/nearby", celebrate({[Segments.QUERY]:locationSchema}),  eventController.filterLocation)
router.get("/search", celebrate({[Segments.QUERY]: {keyword: Joi.string()}}), eventController.search)
router.get("/:id", eventController.getDetail)
router.delete("/:id", jwt({ secret: "hoaingodong", algorithms: ["HS256"] }), eventController.deleteOne)
router.post("/", jwt({ secret: "hoaingodong", algorithms: ["HS256"] }), upload.upload.any(), celebrate({[Segments.BODY]:eventSchema}), eventController.createNew)
router.put("/:id", jwt({ secret: "hoaingodong", algorithms: ["HS256"] }), upload.upload.any(), celebrate({[Segments.BODY]:eventSchema}), eventController.update)
router.post("/image/:id", jwt({ secret: "hoaingodong", algorithms: ["HS256"] }), upload.upload.any(), eventController.uploadImage)
router.delete("/image/:id", jwt({ secret: "hoaingodong", algorithms: ["HS256"] }), eventController.deleteImage)
router.get("/:id/users", joinedEventController.getAllUsers)

module.exports = router

