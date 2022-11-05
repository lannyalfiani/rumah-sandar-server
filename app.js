// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
//     }

const path = require("path")
const express = require("express");
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandlers");
const job = require("./cron/every_10_minutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('multer/tmp'))
app.use(`/`, router);
app.use(errorHandler);

module.exports = app;
