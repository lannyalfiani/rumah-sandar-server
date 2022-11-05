const volunteerController = require('../controllers/volunteerController')
const upload = require("../multer/multer")


const router = require('express').Router()

const inputUpload = upload.fields(
  [
    {
      name: "imageUrl",
      maxCount: 1
    },
    {
      name: "curriculumVitae",
      maxCount: 1
    }
  ])

router.post("/register", inputUpload, volunteerController.registerVolunteer)
router.post("/login", volunteerController.loginVolunteer)









module.exports = router