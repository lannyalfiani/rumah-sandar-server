const {
  compareHashWithPassword,
  signPayloadToToken,
} = require("../helpers/helpers");
const { Orphan, Volunteer } = require("../models");

class orphanController {
  static async registerOrphan(req, res, next) {
    const { fullName, email, password, imageUrl, OrphanageId } = req.body;
    if (!fullName || !email || !password || !imageUrl || !OrphanageId)
      throw { name: "required" };
    try {
      let checkVolunteerEmail = await Volunteer.findOne({ where: { email } });
      if (checkVolunteerEmail) {
        throw { name: "SequelizeUniqueConstraintError" };
      }
      await Orphan.create({
        fullName,
        email,
        password,
        imageUrl,
        role: "orphan",
        OrphanageId,
        matchStatus: "notMatch",
      });

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
