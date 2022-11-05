const volunteerController = require('../controllers/volunteerController')
const  upload  = require("../multer/multer")


const router = require('express').Router()


router.post("/register", upload.single("volunteerPhoto"), volunteerController.registerVolunteer)
router.post("/login", volunteerController.loginVolunteer)









module.exports = router