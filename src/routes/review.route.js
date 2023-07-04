const express = require("express")
const router = express.Router()
const reviewsController = require("../controllers/reviews.controller")
const middleware = require("../utils/middleware")

router.get("/", middleware.authJwt(), reviewsController.getAll)
router.delete("/:id", middleware.authJwt(), reviewsController.deleteOne)

module.exports = router

