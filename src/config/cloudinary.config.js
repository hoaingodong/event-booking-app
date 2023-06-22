require("dotenv").config()
const cloudinary = require("cloudinary")

//config APU key, (-in the .env file)
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// upload files with folder
exports.uploads = (file, folder) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(
            file,
            (result) => {
                resolve({ url: "https" + result.url.slice(4), id: result.public_id })
            },
            {
                resource_type: "auto",
                folder: folder
            },
        )
    })
}



