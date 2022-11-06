const orphanageController = require("../controllers/orphanageController");

const router = require("express").Router();

router.get("/", orphanageController.getOrphanages);

module.exports = router;
