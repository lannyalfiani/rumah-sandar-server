const orphanageController = require('../controllers/orphanageController')
// const authentication = require('../middleware/authentication')


const router = require('express').Router()


router.get("/orphanages", orphanageController.getOrphanages)









module.exports = router