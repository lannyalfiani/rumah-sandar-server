const express = require('express')
const paymentController = require('../controllers/paymentController')
const router = express.Router()

router.post("/xendit-callback", paymentController.acceptCallback)
router.get(`/donations`, paymentController.getDonations)

module.exports = router;