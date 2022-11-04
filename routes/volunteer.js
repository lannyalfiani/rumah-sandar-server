const volunteerController = require("../controllers/volunteerController");
const router = require("express").Router();

router.post("/register", volunteerController.registerVolunteer);
router.post("/login", volunteerController.loginVolunteer);

module.exports = router;
