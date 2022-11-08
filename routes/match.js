const express = require("express");
const matchController = require("../controllers/matchController");
const {
  AuthorizationRequestMatch,
  AuthorizationVolunteerRequestAndGet,
} = require("../middlewares/authorization");
const router = express.Router();

router.get(
  "/",
  AuthorizationVolunteerRequestAndGet,
  matchController.getAllMatch
);
router.post("/", AuthorizationRequestMatch, matchController.RequestToMatch);
router.put(
  "/:matchId",
  AuthorizationVolunteerRequestAndGet,
  matchController.AddVolunteerToMatch
);

router.get("/:matchId", matchController.fetchMatchById)

module.exports = router;
