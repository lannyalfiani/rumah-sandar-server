const categoryController = require('../controllers/categoryController')
// const authentication = require('../middleware/authentication')


const router = require('express').Router()


router.get("/", categoryController.getCategories)









module.exports = router