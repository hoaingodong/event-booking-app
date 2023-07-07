const express = require("express")
const router = express.Router()
const reviewsController = require("../controllers/reviews.controller")
const {celebrate, Segments} = require("celebrate");
const reviewSchema = require("../validation/review.validation");
// const middleware = require("../utils/middleware")

router.get("/", reviewsController.getAll)
router.post("/",  celebrate({[Segments.BODY]:reviewSchema}),  reviewsController.createNew)
router.delete("/:id", reviewsController.deleteOne)

module.exports = router

