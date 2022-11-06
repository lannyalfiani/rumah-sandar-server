const orphanController = require('../controllers/orphanController')


const router = require('express').Router()


router.post("/register", orphanController.registerOrphan)
router.post("/login", orphanController.loginOrphan)









module.exports = router