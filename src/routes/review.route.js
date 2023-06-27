const express = require("express")
const router = express.Router()
const {expressjwt: jwt} = require("express-jwt");
const reviewsController = require("../controllers/reviews.controller")

router.get("/", jwt({ secret: "hoaingodong", algorithms: ["HS256"] }), reviewsController.getAll)
router.delete("/:id", jwt({ secret: "hoaingodong", algorithms: ["HS256"] }), reviewsController.deleteOne)

module.exports = router

