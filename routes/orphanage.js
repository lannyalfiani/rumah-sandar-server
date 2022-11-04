const orphanageController = require('../controllers/orphanageController')
// const authentication = require('../middleware/authentication')


const router = require('express').Router()


router.get("/", orphanageController.getOrphanages)









module.exports = router