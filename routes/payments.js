const express = require('express')
const paymentController = require('../controllers/paymentController')
const router = express.Router()

router.post("/xendit-callback", paymentController.acceptCallback)

module.exports = router;