const express = require("express");
const matchController = require("../controllers/matchController");
const { AuthorizationRequestMatch } = require("../middlewares/authorization");
const router = express.Router();

router.get("/", matchController.getAllMatch);
router.post("/", AuthorizationRequestMatch, matchController.RequestToMatch);
router.put("/:matchId", matchController.AddVolunteerToMatch);

module.exports = router;
