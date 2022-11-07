const nodemailer = require("nodemailer");

async function main(email, subject, additionalData) {

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });

    //! VERIFIED
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

      //! REGISTRATION - VOLUNTEER
    } else if (subject === "Registrasi") {
      console.log(`masuk registrasi`);
      let info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: "Pendaftaran akun Relawan Rumah Sandar berhasil!", // Subject line
        html: `<div>
      <h1>${additionalData}, terima kasih telah mendaftar jadi relawan di Rumah Sandar!</h1>
      <p>Tim kami akan segera melakukan verifikasi</p>
      <p>apabila anda sudah terverifikasi, maka kami akan mengirimkan email bahwa telah terverikasi </p>
      <p> apabila memiliki pertanyaan silahkan hubungi : tim kami</p>
  </div>`,
      });

      //! Schedule - ORPHAN
    } else if (subject === "Schedule-Orphan") {
      let info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: ` <div>
      <h1> Reminder </h1>
      <p>${additionalData}</p>
  </div>`,
      });

      //! Schedule - VOLUNTEER
    } else if (subject === "Schedule-Volunteer") {
      let info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: ` <div>
      <h1> Reminder </h1>
      <p>${additionalData}</p>
      <p>silahkan klik link :<span><a href="https://google.com">Ruang kelas</a></span></p>
  </div>`,
      });

      //! Schedule - MATCH success
    } else if (subject === "Match Success") {
      let info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: ` <div>
      <h1> Selamat </h1>
      <p>${additionalData}</p>
      <p>untuk daftar schedulenya dapat mengklik Link berikut: <span><a href="https://google.com">Jadwal</a> </p> 
  </div>`,
      });
    }
  } catch (err) {
    console.log(err, `<<<<<<<<<`);
  }
}

module.exports = main;
