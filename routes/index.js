const express = require('express')
const router = express.Router()
const volunteerRouter = require("./volunteer")
const orphanRouter = require("./orphan")
const orphanagesRouter = require('./orphanage')
const categoryRouter = require('./category')
const adminRouter = require('./admin')



router.use('/', categoryRouter)
router.use("/", orphanagesRouter)
router.use('/admin', adminRouter)
router.use("/volunteer", volunteerRouter)
router.use("/orphan", orphanRouter)







module.exports = router;
