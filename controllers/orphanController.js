const {
  compareHashWithPassword,
  signPayloadToToken,
} = require("../helpers/helpers");
// const cloudinary = require("cloudinary");
const { Orphan, Volunteer } = require("../models");
const CloudinaryCloud = require("../helpers/CloudinaryCloud");
const nodeMailer = require("../helpers/nodemailer");

class orphanController {
  static async registerOrphan(req, res, next) {
    try {
      const { fullName, email, password, OrphanageId } = req.body;

      if (req.files.imageUrl === undefined) {
        throw { name: "required" };
      }
      let imageUrl = req.files.imageUrl[0];
      
      console.log("before upload");
      let imageTODB = await CloudinaryCloud.uploadImageOrphan(imageUrl);
      console.log("after upload");

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
      nodeMailer(email, "Pendaftaran Adik Ajar", fullName);
      res.status(201).json({ message: "Register Success" });
    } catch (err) {
      console.log(err , `<<<<<<<<< di controller`);
      next(err);
    }
  }

  static async loginOrphan(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "required" };
      let orphan = await Orphan.findOne({ where: { email } });
      if (!orphan) throw { name: "Invalid Email/Password" };
      if (!orphan.verified) throw { name: "You are not verified" };
      let isValid = compareHashWithPassword(password, orphan.password);
      console.log(isValid);
      if (!isValid) throw { name: "Invalid Email/Password" };
      const access_token = signPayloadToToken({
        id: orphan.id,
        role: orphan.role,
      });
      const sendData = {
        id: orphan.id,
        role: orphan.role,
        fullName: orphan.fullName,
        verified: orphan.verified,
        matchStatus: orphan.matchStatus,
        imageUrl: orphan.imageUrl,
      };
      res.status(200).json({ access_token, sendData });
    } catch (err) {
      next(err);
    }
  }
  // static async getOrphanById(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const Orphans = await Orphan.findByPk(id);
  //     if (!Orphans) throw { name: "Not Found" };

  //     res.status(200).json(Orphans);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = orphanController;
