const multer = require("multer")

const storage = multer.diskStorage({})

let upload = multer({
  storage
})

const uploadFiles = upload.fields([
  {
    name: "imageUrl",
    maxCount: 1
  },
  {
    name: "curriculumVitae",
    maxCount: 1
  }
])

module.exports = uploadFiles;