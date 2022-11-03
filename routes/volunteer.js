const volunteerController = require('../controllers/volunteerController')
// const authentication = require('../middleware/authentication')


const router = require('express').Router()


router.post("/register", volunteerController.registerVolunteer)
router.post("/login", volunteerController.loginVolunteer)









module.exports = router