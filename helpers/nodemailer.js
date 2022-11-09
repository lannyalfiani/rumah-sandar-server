const nodemailer = require("nodemailer");

async function nodeMailer(email, subject, additionalData) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });

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
      await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: "Pendaftaran akun Kakak Ajar Rumah Sandar berhasil!", // Subject line
        html: `<div>
      <h1>${additionalData}, terima kasih telah mendaftar jadi Kakak Ajar di Rumah Sandar!</h1>
      <p>Tim kami akan segera melakukan verifikasi</p>
      <p>apabila anda sudah terverifikasi, maka kami akan mengirimkan email bahwa telah terverikasi </p>
      <p>apabila memiliki pertanyaan silahkan hubungi ke email resmi rumah sandar yakni di : rumahsandarhacktiv@gmail.com</p>
  </div>`,
      });

      //! Schedule - ORPHAN
    } else if (subject === "Jadwal Adik Ajar") {
      await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: ` <div>
      <h1> Reminder </h1>
      <p>${additionalData}</p>
      <p>silahkan klik link :<span><a href="https://rumah-sandar.web.app/schedule">Jadwal Kelas</a></span></p>
  </div>`,
      });

      //! Schedule - VOLUNTEER
    } else if (subject === "Jadwal Kakak Ajar") {
      await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: ` <div>
      <h1> Reminder </h1>
      <p>${additionalData}</p>
      <p>silahkan klik link :<span><a href="https://rumah-sandar.web.app/schedule">Jadwal Kelas</a></span></p>
  </div>`,
      });

      //! Schedule - MATCH success
    } else if (subject === "Kamu Telah Memilih Adik Ajar") {
      await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: ` <div>
      <h1> Selamat </h1>
      <p>${additionalData}</p>
      <p>untuk daftar jadwal pelajaran dapat mengklik Link berikut: <span><a href="https://rumah-sandar.web.app/schedule">Jadwal Kelas</a> </p>
  </div>`,
      });
    } else if (subject === "Kamu Telah Mendapatkan Kakak Ajar") {
      await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: ` <div>
      <h1> Selamat </h1>
      <p>${additionalData}</p>
      <p>untuk daftar jadwal pelajaran dapat mengklik Link berikut: <span><a href="https://rumah-sandar.web.app/schedule">Jadwal Kelas</a> </p> 
  </div>`,
      });
    }
  } catch (err) {
    console.log(err, `<<<<<<<<<`);
  }
}

module.exports = nodeMailer;
