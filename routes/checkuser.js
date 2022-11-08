const express = require("express");
const checkUserController = require("../controllers/checkUserController");
const router = express.Router();

router.get("/", checkUserController.getUserLogin);
router.get("/studypair", checkUserController.matchStudyPair);

module.exports = router;
