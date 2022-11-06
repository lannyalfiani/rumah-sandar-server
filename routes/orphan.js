const router = require('express').Router()
const { orphanImage } = require("../middlewares/multer")
const orphanController = require('../controllers/orphanController')

router.post("/register", orphanImage, orphanController.registerOrphan)
router.post("/login", orphanController.loginOrphan)

module.exports = router