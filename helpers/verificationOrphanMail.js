// "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
function verificationOrphanMail(email, subject, additionalData) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });
   transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: ` <div>
      <h1> Selamat ${additionalData} Anda Telah Terverifikasi</h1>
      <p>Silahkan Klik Link ini untuk bisa login : <span><a href="https://rumah-sandar.web.app/login">Login Rumah Sandar</a></span></p>
  </div>`,
  });
}

module.exports = verificationOrphanMail;
