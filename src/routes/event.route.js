const express = require("express")
const router = express.Router()
const {celebrate, Segments} = require("celebrate")
const eventController = require("../controllers/events.controller")
const filterSchema = require("../validation/filter.validation")
const upload = require("../config/multer.config")
const {createEventSchema, updateEventSchema} = require("../validation/event.validation")
const joinedEventController = require("../controllers/joinedEvent.controller")
const middleware = require("../utils/middleware")

router.get("/", celebrate({[Segments.QUERY]:filterSchema}), eventController.filter)
router.get("/all", eventController.getAll)
router.get("/:id", eventController.getDetail)
router.delete("/:id", eventController.deleteOne)
router.post("/", upload.upload.any(), celebrate({[Segments.BODY]:createEventSchema}), eventController.createNew)
router.put("/:id", upload.upload.any(), celebrate({[Segments.BODY]:updateEventSchema}), eventController.update)
router.post("/:id/image", middleware.authJwt(), upload.upload.any(), eventController.uploadImage)
router.delete("/:id/image", middleware.authJwt(), eventController.deleteImage)
router.get("/:id/users", joinedEventController.getAllUsers)

module.exports = router

