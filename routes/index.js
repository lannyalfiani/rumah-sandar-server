const express = require('express')
const router = express.Router()
const matchRouter = require("./match");
const classRouter = require("./class");
const volunteerRouter = require("./volunteer")
const orphanRouter = require("./orphan")
const orphanagesRouter = require('./orphanage')
const categoryRouter = require('./category')
const adminRouter = require('./admin')
const paymentRouter = require("./payments")

router.get(`/`, (req, res) => {
  res.status(200).json({ message: `Rumah Sandar, server up!` });
});


router.use('/categories', categoryRouter)
router.use("orphanages/", orphanagesRouter)
router.use('/admin', adminRouter)
router.use("/volunteer", volunteerRouter)
router.use("/orphan", orphanRouter)
router.use("/payment", paymentRouter)
router.use("/match", matchRouter);
router.use("/classes", classRouter);

module.exports = router;