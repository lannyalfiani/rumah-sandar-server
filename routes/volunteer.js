const adminController = require("../controllers/adminController");
const volunteerController = require("../controllers/volunteerController");

const router = require("express").Router();

router.post("/login", adminController.adminLogin)
router.post("/register", volunteerController.registerVolunteer);
router.post("/login", volunteerController.loginVolunteer);


module.exports = router;