const router = require("express").Router();
const { volunteerFiles } = require("../middlewares/multer");
const volunteerController = require("../controllers/volunteerController");
const authentication = require("../middlewares/authentication");

router.get("/:id", authentication, volunteerController.getVolunteerById);
router.post("/register", volunteerFiles, volunteerController.registerVolunteer);
router.post("/login", volunteerController.loginVolunteer);

module.exports = router;
