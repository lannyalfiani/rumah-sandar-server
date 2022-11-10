const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const handlebars = require("handlebars");
const { promisify } = require("util");
const path = require("path");
const fs = require("fs");

async function nodeMailer(email, subject, additionalData) {
  try {
    let transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail", // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      })
    );

    //! VERIFIED
    if (subject === "Verifikasi Reralawan") {
      await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: ` <div>
      <h1> Selamat ${additionalData} Anda Telah Terverifikasi</h1>
      <p>Silahkan Klik Link ini untuk bisa login : <span><a href="https://rumah-sandar.web.app/loginVolunteer">Login Rumah Sandar</a></span></p>
  </div>`,
      });

      //! REGISTRATION - ORPHAN
    } else if (subject === "Pendaftaran Adik Ajar") {
      await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: "Pendaftaran akun Adik Ajar Rumah Sandar berhasil!", // Subject line
        html: `<div>
      <h1>${additionalData}, terima kasih telah mendaftar jadi Adik Ajar di Rumah Sandar!</h1>
      <p>Tim kami akan segera melakukan verifikasi</p>
      <p>apabila anda sudah terverifikasi, maka kami akan mengirimkan email bahwa telah terverikasi </p>
      <p>apabila memiliki pertanyaan silahkan hubungi ke email resmi rumah sandar yakni di : rumahsandarhacktiv@gmail.com</p>
  </div>`,
      });

      //! REGISTRATION - VOLUNTEER
    } else if (subject === "Pendaftaran Kakak Ajar") {
      const filePath = path.join(
        __dirname,
        "../assets/email-kakak-registrasi.html"
      );
      const source = fs.readFileSync(filePath, "utf-8").toString();
      const template = handlebars.compile(source);
      // const replacements = {
      //   username: "Darth Vader",
      // };
      const htmlToSend = template();
      let response = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: "Pendaftaran akun Kakak Ajar Rumah Sandar berhasil!", // Subject line
        html: htmlToSend,
      });
      console.log(response);
      //! Schedule - ORPHAN
    } else if (subject === "Jadwal Adik Ajar") {
      const filePath = path.join(
        __dirname,
        "../assets/reminder_besok_ada_class.html"
      );
      const source = fs.readFileSync(filePath, "utf-8").toString();
      const template = handlebars.compile(source);
      // const replacements = {
      //   username: "Darth Vader",
      // };
      const htmlToSend = template();
      await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: "Besok Ada Kelas", // Subject line
        html: htmlToSend,
      });

      //! Schedule - VOLUNTEER
    } else if (subject === "Jadwal Kakak Ajar") {
      const filePath = path.join(
        __dirname,
        "../assets/reminder_besok_ada_class.html"
      );
      const source = fs.readFileSync(filePath, "utf-8").toString();
      const template = handlebars.compile(source);
      // const replacements = {
      //   username: "Darth Vader",
      // };
      const htmlToSend = template();
      await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: "Besok Ada Kelas", // Subject line
        html: htmlToSend,
      });

      //! Schedule - MATCH success
    } else if (subject === "Kamu Telah Memilih Adik Ajar") {
      const filePath = path.join(__dirname, "../assets/match_Kakak.html");
      const source = fs.readFileSync(filePath, "utf-8").toString();
      const template = handlebars.compile(source);
      // const replacements = {
      //   username: "Darth Vader",
      // };
      const htmlToSend = template();
      await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: "Kamu Telah Memilih Adik Asuh", // Subject line
        html: htmlToSend,
      });
    } else if (subject === "Kamu Telah Mendapatkan Kakak Ajar") {
      const filePath = path.join(__dirname, "../assets/match_Adik.html");
      const source = fs.readFileSync(filePath, "utf-8").toString();
      const template = handlebars.compile(source);
      // const replacements = {
      //   username: "Darth Vader",
      // };
      const htmlToSend = template();
      await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: "Kamu Telah Mendapatkan Kakak Asuh", // Subject line
        html: htmlToSend,
      });
    }
  } catch (err) {
    console.log(err, `<<<<<<<<<`);
  }
}

module.exports = nodeMailer;
