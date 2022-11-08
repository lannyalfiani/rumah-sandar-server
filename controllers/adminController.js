const {
  compareHashWithPassword,
  signPayloadToToken,
} = require("../helpers/helpers");
const { Volunteer, Admin, Orphan, Match } = require("../models");
const main = require("../helpers/nodemailer");
const verificationOrphanMail = require("../helpers/verificationOrphanMail");

class adminController {
  static async adminLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "required" };
      let admin = await Admin.findOne({ where: { email } });
      // console.log(admin, "adminya dapet gak");
      if (!admin) throw { name: "Invalid Email/Password" };
      let isValid = compareHashWithPassword(password, admin.password);
      if (!isValid) throw { name: "Invalid Email/Password" };
      const access_token = signPayloadToToken({
        id: admin.id,
        role: admin.role,
      });
      const sendData = {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      };
      res.status(200).json({ access_token, sendData });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async getVolunteers(req, res, next) {
    try {
      const volunteers = await Volunteer.findAll({
        order: [["id", "ASC"]],
      });

      res.status(200).json(volunteers);
    } catch (error) {
      next(error);
    }
  }

  static async verifyOrphan(req, res, next) {
    const { orphanId } = req.params;
    try {
      const foundOrphan = await Orphan.findByPk(orphanId);
      if (!foundOrphan) throw { name: "Not Found" };

      await Orphan.update(
        {
          verified: true,
        },
        { where: { id: orphanId } }
      );

      verificationOrphanMail(foundOrphan.email, "Verifikasi");
      res.status(200).json({ message: `Verify Success` });
    } catch (error) {
      next(error);
    }
  }

  static async verifyVolunteer(req, res, next) {
    try {
      const { volunteerId } = req.params;
      console.log(req.params);
      const foundVolunteer = await Volunteer.findByPk(volunteerId);
      if (!foundVolunteer) throw { name: "Not Found" };

      await Volunteer.update(
        {
          verified: true,
        },
        { where: { id: volunteerId } }
      );
      main(foundVolunteer.email, "Verifikasi");
      res.status(200).json({ message: `Verify Success` });
    } catch (error) {
      next(error);
    }
  }

  static async getOrphans(req, res, next) {
    try {
      const Orphans = await Orphan.findAll();
      if (!Orphans) throw { name: "Not Found" };

      res.status(200).json(Orphans);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = adminController;
