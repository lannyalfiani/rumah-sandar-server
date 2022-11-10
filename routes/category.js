const categoryController = require("../controllers/categoryController");

const router = require("express").Router();

router.get("/", categoryController.getCategories);

module.exports = router;
