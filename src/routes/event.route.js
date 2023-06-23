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
var { expressjwt: jwt } = require("express-jwt");

router.get("/", celebrate({[Segments.QUERY]:filterSchema}), eventController.filter)
router.get("/nearby", celebrate({[Segments.QUERY]:locationSchema}),  eventController.filterLocation)
router.get("/search", celebrate({[Segments.QUERY]: {keyword: Joi.string()}}), eventController.search)
router.get("/:id", eventController.getDetail)
router.delete("/:id", jwt({ secret: "hoaingodong", algorithms: ["HS256"] }), eventController.deleteOne)
router.post("/", jwt({ secret: "hoaingodong", algorithms: ["HS256"] }), upload.upload.any(), celebrate({[Segments.BODY]:eventSchema}), eventController.createNew)
router.put("/:id", jwt({ secret: "hoaingodong", algorithms: ["HS256"] }), upload.upload.any(), celebrate({[Segments.BODY]:eventSchema}), eventController.update)
router.post("/image/:id", jwt({ secret: "hoaingodong", algorithms: ["HS256"] }), upload.upload.any(), eventController.uploadImage)
router.delete("/image/:id", jwt({ secret: "hoaingodong", algorithms: ["HS256"] }), eventController.deleteImage)

module.exports = router

