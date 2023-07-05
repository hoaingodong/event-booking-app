const multer = require("multer")
const {CustomError} = require("../utils/CustomError");

//multer.diskStorage() creates a storage space for storing files.
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, new Date().toDateString() + "-" + file.originalname)
    },
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg")
    {
        cb(null, true)
    }
    else {
        cb({message: "Unsupported file format"}, false)
        throw new CustomError("File is not supported", 403)
    }}

const upload = multer(({
    storage:storage,
    limits: {fileSize: 1024*1024},
    fileFilter: fileFilter
}))

module.exports = {upload}