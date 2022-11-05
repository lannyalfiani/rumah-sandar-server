const {
  compareHashWithPassword,
  signPayloadToToken,
} = require("../helpers/helpers");

const { Volunteer, Orphan } = require("../models");
const cloudinary = require("cloudinary")
class volunteerController {
  static async registerVolunteer(req, res, next) {
    try {
      const {
        fullName,
        email,
        password,
        linkedinUrl,
        lastEducation, } = req.body;

      let imageUrl = req.files.imageUrl[0]
      let curriculumVitae = req.files.curriculumVitae[0]
      let imageTODB = ""
      let CVTODB = ""

      await cloudinary.v2.uploader
        .upload(imageUrl.path, { folder: "RumahSandar/Volunteer/Images" })
        .then(result => {
          imageTODB = result.url
        })
        .catch(err => {
          throw { name: { err } }
        })

      await cloudinary.v2.uploader
        .upload(curriculumVitae.path, { folder: "RumahSandar/Volunteer/CVs" })
        .then(result => {
          CVTODB = result.url
        })
        .catch(err => {
          throw { name: { err } }
        })

      if (
        !fullName ||
        !email ||
        !password ||
        !linkedinUrl ||
        !lastEducation
      )
        throw { name: "required" };

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
      res.status(201).json({ message: "Register Success" });
    } catch (err) {
      next(err);
    }
  }

  static async loginVolunteer(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "required" };
      let volunteer = await Volunteer.findOne({ where: { email } });
      if (!volunteer) throw { name: "Invalid Email/Password" };
      let isValid = compareHashWithPassword(password, volunteer.password);
      if (!isValid) throw { name: "Invalid Email/Password" };

      const access_token = signPayloadToToken({
        id: volunteer.id,
        role: volunteer.role,
      });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = volunteerController;
