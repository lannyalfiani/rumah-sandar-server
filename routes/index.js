const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const matchRouter = require("./match");

router.get(`/`, (req, res) => {
  res.status(200).json({ message: `Rumah Sandar, server up!` });
});

router.use("/user", userRouter);
router.use("/match", matchRouter);
// router.use("/", apiRouter)
// router.use("/transaction", transactionRouter)

module.exports = router;
