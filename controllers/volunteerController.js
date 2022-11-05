const {
  compareHashWithPassword,
  signPayloadToToken,
} = require("../helpers/helpers");
const imagekit = require("../imagekit/imagekitConfig");
const { Volunteer, Orphan } = require("../models");
var fs = require('fs');
class volunteerController {
  static async registerVolunteer(req, res, next) {
    try {
      const {
        fullName,
        email,
        password,
        linkedinUrl,
        lastEducation, } = req.body;

      let image = req.files.imageUrl[0]
      let curriculumVitae = req.files.curriculumVitae[0]

      console.log(curriculumVitae);

      if (curriculumVitae) {
        fs.readFile(curriculumVitae.path, function (err, data) {
          if (err) throw err; // Fail if the file can't be read.
          imagekit.upload({
            file: curriculumVitae.path, //required
            fileName: curriculumVitae.filename, //required
            tags: ["tag1", "tag2"]
          }, function (error, result) {
            if (error) console.log(error);
            else console.log(result);
          });
        });

      }


      // if (
      //   !fullName ||
      //   !email ||
      //   !password ||
      //   !linkedinUrl ||
      //   !lastEducation
      // )
      //   throw { name: "required" };

      // let checkOrphanEmail = await Orphan.findOne({ where: { email } });
      // if (checkOrphanEmail) {
      //   throw { name: "SequelizeUniqueConstraintError" };
      // }
      // await Volunteer.create({
      //   fullName,
      //   email,
      //   password,
      //   imageUrl,
      //   role: "volunteer",
      //   linkedinUrl,
      //   curriculumVitae,
      //   lastEducation,
      //   matchStatus: "notMatch",
      // });
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
