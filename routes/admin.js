const adminController = require('../controllers/adminController')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()
router.post("/login", adminController.adminLogin)

router.get("/volunteers", authentication, adminController.getVolunteers)
router.patch("/orphan/:orphanId", authentication, adminController.verifyOrphan)
router.patch("/volunteer/:volunteerId", authentication, adminController.verifyVolunteer)




module.exports = router