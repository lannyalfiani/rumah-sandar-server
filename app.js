// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
//     }
// const imageKit = require("imagekit")
const path = require("path")
const express = require("express");
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandlers");
const app = express();

// const imageKit = new ImageKit({
//   publicKey: "public_MEcUA/WCGSlcVfJ5M4z1wJeCYBM=",
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
// })

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('multer/tmp'))
app.use(`/`, router);
app.use(errorHandler);

module.exports = app;
