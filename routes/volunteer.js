const router = require('express').Router()
const uploadFiles = require("../middlewares/multer")
const volunteerController = require('../controllers/volunteerController')

router.post("/register", uploadFiles, volunteerController.registerVolunteer)
router.post("/login", volunteerController.loginVolunteer)

module.exports = router