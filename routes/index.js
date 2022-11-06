const express = require('express')
const router = express.Router()

const matchRouter = require("./match");
const classRouter = require("./class");
const volunteerRouter = require("./volunteer")
const orphanRouter = require("./orphan")
const orphanagesRouter = require('./orphanage')
const categoryRouter = require('./category')
const adminRouter = require('./admin')
const paymentRouter = require("./payments");
const authentication = require('../middlewares/authentication');

router.get(`/`, (req, res) => {
  res.status(200).json({ message: `Rumah Sandar, server up!` });
});

router.use("/volunteer", volunteerRouter)
router.use("/orphan", orphanRouter)
router.use("/orphanages", orphanagesRouter)
router.use("/payment", paymentRouter)

router.use(authentication)
router.use('/admin', adminRouter)
router.use("/match", matchRouter);

router.use('/categories', categoryRouter)
router.use("/classes", classRouter);

module.exports = router;