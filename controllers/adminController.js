const { Volunteer, Orphan } = require("../models");

class adminController {
  static async getVolunteers(req, res, next) {
    try {
      const volunteers = await Volunteer.findAll();
      if (!volunteers) throw { name: "Not Found" };

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
