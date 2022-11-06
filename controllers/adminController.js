const { compareHashWithPassword , signPayloadToToken} = require("../helpers/helpers");
const { Volunteer, Admin, Orphan, Match } = require("../models");

class adminController {


  static async adminLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "required" };
      let admin = await Admin.findOne({ where: { email } });
      console.log(admin, 'adminya dapet gak')
      if (!admin) throw { name: "Invalid Email/Password" };
      let isValid = compareHashWithPassword(password, admin.password);
      if (!isValid) throw { name: "Invalid Email/Password" };
      const access_token = signPayloadToToken({
        id: admin.id,
        role: admin.role,
      });
      res.status(200).json({ access_token });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async getVolunteers(req, res, next) {
    try {
      const volunteers = await Volunteer.findAll();
      if (!volunteers) throw { name: "Not Found" };

      res.status(200).json(volunteers);
    } catch (error) {
      // console.log(error);
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

      await Match.create({
        OrphanId: foundOrphan.id,
      });

      res.status(200).json({ message: `Verify Success` });
    } catch (error) {
      next(error);
    }
  }

  static async verifyVolunteer(req, res, next) {
    const { volunteerId } = req.params;
    try {
      const foundVolunteer = await Volunteer.findByPk(volunteerId);
      if (foundVolunteer) throw { name: "Not Found" };

      await Volunteer.update(
        {
          verified: true,
        },
        { where: { id: volunteerId } }
      );

      res.status(200).json({ message: `Verify Success` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = adminController;
