// "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(email, subject, message) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });
  if (subject === "Verifikasi") {
    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: ` <div>
      <h1> Selamat Anda Telah Terverifikasi</h1>
      <p>Silahkan Klik Link ini untuk bisa login : <span><a href="https://google.com">Rumah Sandar</a></span></p>
  </div>`,
    });
  } else if (subject === "Registrasi") {
    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: ` <div>
      <h1> Terima Kasih Sudah Mendaftar</h1>
      <p>Tim kami akan segera melakukan verifikasi</p>
      <p>apabila anda sudah terverifikasi, maka kami akan mengirimkan email bahwa telah terverikasi </p>
      <p> apabila memiliki pertanyaan silahkan hubungi : tim kami</p>
  </div>`,
    });
  } else if (subject === "Schedule-Orphan") {
    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: ` <div>
      <h1> Reminder </h1>
      <p>${message}</p>
  </div>`,
    });
  } else if (subject === "Schedule-Volunteer") {
    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: ` <div>
      <h1> Reminder </h1>
      <p>${message}</p>
      <p>silahkan klik link :<span><a href="https://google.com">Ruang kelas</a></span></p>
  </div>`,
    });
  } else if (subject === "Match Success") {
    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: ` <div>
      <h1> Selamat </h1>
      <p>${message}</p>
      <p>untuk daftar schedulenya dapat mengklik Link berikut: <span><a href="https://google.com">Jadwal</a> </p> 
  </div>`,
    });
  }
  // send mail with defined transport object

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //   Preview only available when sending through an Ethereal account
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = main;
