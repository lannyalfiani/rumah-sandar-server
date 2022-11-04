const adminController = require('../controllers/adminController')

const router = require('express').Router()


router.get("/volunteers", adminController.getVolunteers)
router.patch("/orphan/:orphanId", adminController.verifyOrphan)
router.patch("/volunteer/:volunteerId", adminController.verifyVolunteer)




module.exports = router