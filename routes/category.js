const categoryController = require('../controllers/categoryController')

const router = require('express').Router()

router.get("/categories", categoryController.getCategories)

module.exports = router