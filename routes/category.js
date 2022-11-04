const categoryController = require('../controllers/categoryController')
// const authentication = require('../middleware/authentication')


const router = require('express').Router()


router.get("/categories", categoryController.getCategories)









module.exports = router