const multer = require("multer")

const storage = multer.diskStorage({})

let upload = multer({
  storage
})

const volunteerFiles = upload.fields([
  {
    name: "imageUrl",
    maxCount: 1
  },
  {
    name: "curriculumVitae",
    maxCount: 1
  }
])

const orphanImage = upload.fields([
  {
    name: "imageUrl",
    maxCount: 1
  }
])

module.exports = {
  volunteerFiles,
  orphanImage
};