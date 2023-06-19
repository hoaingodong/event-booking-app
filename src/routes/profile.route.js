const express = require("express")
const profileController = require("../controllers/profile.controller");
const router = express.Router()
const upload = require("../config/multer.config")
const profileSchema = require("../validation/profile.validation")
const {celebrate, Segments} = require("celebrate");

router.post("/upload-avatar/:id", upload.upload.any(), profileController.uploadAvatar)
router.post("/edit-avatar/:id", upload.upload.any(), profileController.editAvatar)
router.delete("/delete-avatar/:id", profileController.deleteAvatar)
router.get("/profile-event/:id", profileController.profileEvent)
router.get("/profile-about/:id", profileController.profileAbout)
router.get("/profile-reviews/:id", profileController.profileReviews)
router.put("/edit-profile/:id", celebrate({[Segments.BODY]:profileSchema}), profileController.editProfile)

module.exports = router

