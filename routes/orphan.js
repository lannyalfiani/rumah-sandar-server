const router = require("express").Router();
const { orphanImage } = require("../middlewares/multer");
const orphanController = require("../controllers/orphanController");
const authentication = require("../middlewares/authentication");

router.get("/:id", authentication, orphanController.getOrphanById);
router.post("/register", orphanImage, orphanController.registerOrphan);
router.post("/login", orphanController.loginOrphan);

module.exports = router;
