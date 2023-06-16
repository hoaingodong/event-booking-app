const express = require("express")
const profileController = require("../controllers/profile.controller");
const router = express.Router()
const upload = require("../config/multer.config")

router.post("/upload-avatar", upload.upload.any(), profileController.uploadAvatar)
router.post("/edit-avatar", upload.upload.any(), profileController.editAvatar)
router.post("/delete-avatar", profileController.deleteAvatar)
router.get("/profile-event/:id", upload.upload.any(), profileController.profileEvent)
router.get("/profile-about/:id", upload.upload.any(), profileController.profileAbout)
router.get("/profile-reviews/:id", profileController.profileReviews)

module.exports = router

