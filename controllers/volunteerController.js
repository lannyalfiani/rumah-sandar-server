const {
  compareHashWithPassword,
  signPayloadToToken,
} = require("../helpers/helpers");
const { Volunteer, Orphan } = require("../models");
const main = require("../helpers/nodemailer");
const cloudinary = require("cloudinary");
const CloudinaryCloud = require("../helpers/CloudinaryCloud");
class volunteerController {
  static async registerVolunteer(req, res, next) {
    try {
      const { fullName, email, password, linkedinUrl, lastEducation } =
        req.body;

      let imageUrl = req.files.imageUrl[0]
      let curriculumVitae = req.files.curriculumVitae[0]

      let imageTODB = await CloudinaryCloud.uploadImageVolunteer(imageUrl)
      let CVTODB = await CloudinaryCloud.uploadCV(curriculumVitae)

      let checkOrphanEmail = await Orphan.findOne({ where: { email } });

      if (checkOrphanEmail) {
        throw { name: "SequelizeUniqueConstraintError" };
      }

      await Volunteer.create({
        fullName,
        email,
        password,
        imageUrl: imageTODB,
        role: "volunteer",
        linkedinUrl,
        curriculumVitae: CVTODB,
        lastEducation,
        matchStatus: "notMatch",
      });
      main(email, "Registrasi", fullName);
      res.status(201).json({ message: "Register Success" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async loginVolunteer(req, res, next) {
    console.log(req.body)
    try {
      console.log(req.body, "ini di controller");
      const { email, password } = req.body;
      if (!email || !password) throw { name: "required" };
      let volunteer = await Volunteer.findOne({ where: { email } });
      if (!volunteer) throw { name: "Invalid Email/Password" };
      if (!volunteer.verified) throw { name: "You are not verified" };
      let isValid = compareHashWithPassword(password, volunteer.password);
      if (!isValid) throw { name: "Invalid Email/Password" };

      const access_token = signPayloadToToken({
        id: volunteer.id,
        role: volunteer.role,
      });
      const sendData = {
        id: volunteer.id,
        role: volunteer.role,
        fullName: volunteer.fullName,
        verified: volunteer.verified,
        matchStatus: volunteer.matchStatus,
        imageUrl: volunteer.imageUrl,
      };
      res.status(200).json({ access_token, sendData });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  // static async getVolunteerById(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const volunteers = await Volunteer.findByPk(id);
  //     if (!volunteers) throw { name: "Not Found" };

  //     res.status(200).json(volunteers);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = volunteerController;
