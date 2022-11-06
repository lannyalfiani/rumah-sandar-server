const {
  compareHashWithPassword,
  signPayloadToToken,
} = require("../helpers/helpers");
const { Volunteer, Orphan } = require("../models");
const main = require("../helpers/nodemailer");
class volunteerController {
  static async registerVolunteer(req, res, next) {
    try {
      const {
        fullName,
        email,
        password,
        linkedinUrl,
        lastEducation,
        imageUrl,
        curriculumVitae,
      } = req.body;

      // let imageUrl = req.files.imageUrl[0].fieldname
      // let curriculumVitae = req.files.curriculumVitae[0].fieldname

      // console.log(req.files.imageUrl[0].fieldname);
      // console.log(req.files.curriculumVitae[0].fieldname);

      if (!fullName || !email || !password || !linkedinUrl || !lastEducation)
        throw { name: "required" };

      let checkOrphanEmail = await Orphan.findOne({ where: { email } });
      if (checkOrphanEmail) {
        throw { name: "SequelizeUniqueConstraintError" };
      }
      await Volunteer.create({
        fullName,
        email,
        password,
        imageUrl,
        role: "volunteer",
        linkedinUrl,
        curriculumVitae,
        lastEducation,
        matchStatus: "notMatch",
      });
      main(email, "Registrasi");
      res.status(201).json({ message: "Register Success" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async loginVolunteer(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "required" };
      let volunteer = await Volunteer.findOne({ where: { email } });
      if (!volunteer) throw { name: "Invalid Email/Password" };
      if(!volunteer.verified) throw { name: "You are not verified" }
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
      };
      res.status(200).json({ access_token, sendData });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = volunteerController;
