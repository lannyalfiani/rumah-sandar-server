const {
  compareHashWithPassword,
  signPayloadToToken,
} = require("../helpers/helpers");
const { Volunteer } = require("../models");

class volunteerController {
  static async registerVolunteer(req, res, next) {
    try {
      const { fullName, email, password, imageUrl } = req.body;
      if (!fullName || !email || !password || !imageUrl)
        throw { name: "required" };
      await Volunteer.create({
        fullName,
        email,
        password,
        imageUrl,
        role: "volunteer",
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
      const access_token = signPayloadToToken({ id: volunteer.id });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = volunteerController;
