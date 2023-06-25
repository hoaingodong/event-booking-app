const express = require("express")
const router = express.Router()
const reviewsController = require("../controllers/reviews.controller")
var { expressjwt: jwt } = require("express-jwt");

router.get("/", jwt({ secret: "hoaingodong", algorithms: ["HS256"] }), reviewsController.getAll)
router.delete("/:id", jwt({ secret: "hoaingodong", algorithms: ["HS256"] }), reviewsController.deleteOne)

module.exports = router

