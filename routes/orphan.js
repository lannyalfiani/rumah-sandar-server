const orphanController = require('../controllers/orphanController')
// const authentication = require('../middleware/authentication')


const router = require('express').Router()


router.post("/register", orphanController.registerOrphan)
router.post("/login", orphanController.loginOrphan)
// router.patch("/")









module.exports = router