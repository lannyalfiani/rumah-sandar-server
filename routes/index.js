const express = require('express')
const router = express.Router()

const volunteerRouter = require("./volunteer")
const orphanRouter = require("./orphan")
const orphanagesRouter = require('./orphanage')
const categoryRouter = require('./category')
const adminRouter = require('./admin')

const userRouter = require("./user")
const paymentRouter = require("./payments")

router.get(`/`, (req, res) => {
  res.status(200).json({ message: `Rumah Sandar, server up!` })
})

router.use('/', categoryRouter)
router.use("/", orphanagesRouter)
router.use('/admin', adminRouter)
router.use("/volunteer", volunteerRouter)
router.use("/orphan", orphanRouter)
router.use("/user", userRouter)
router.use("/payment", paymentRouter)





module.exports = router;