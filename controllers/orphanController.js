const { compareHashWithPassword, signPayloadToToken } = require("../helpers/helpers");
const cloudinary = require("cloudinary")
const { Orphan, Volunteer } = require("../models");

class orphanController {

  static async registerOrphan(req, res, next) {
    try {
      const {
        fullName,
        email,
        password,
        OrphanageId
      } = req.body;

      let imageUrl = req.files.imageUrl[0]
      let imageTODB = ""

      await cloudinary.v2.uploader
        .upload(imageUrl.path, { folder: "RumahSandar/Orphans" })
        .then(result => {
          imageTODB = result.url
        })
        .catch(err => {
          throw { name: { err } }
        })

      if (!fullName
        || !email
        || !password
        || !imageUrl
        || !OrphanageId
      )
        throw { name: "required" };

      let checkVolunteerEmail = await Volunteer.findOne({ where: { email } });

      if (checkVolunteerEmail) {
        throw { name: "SequelizeUniqueConstraintError" };
      }

      await Orphan.create({
        fullName,
        email,
        password,
        imageUrl: imageTODB,
        role: "orphan",
        OrphanageId,
        matchStatus: "notMatch",
      });
      main(email, "Registrasi");
      res.status(201).json({ message: "Register Success" });
    } catch (err) {
      next(err);
    }
  }

  static async loginOrphan(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) throw { name: "required" };
    try {
      let orphan = await Orphan.findOne({ where: { email } });
      if (!orphan) throw { name: "Invalid Email/Password" };
      if(!orphan.verified) throw { name: "You are not verified" }
      let isValid = compareHashWithPassword(password, orphan.password);
      if (!isValid) throw { name: "Invalid Email/Password" };
      const access_token = signPayloadToToken({ id: orphan.id });
      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = orphanController;
