const { Orphanage } = require("../models");

class orphanageController {
  static async getOrphanages(req, res, next) {
    try {
      let orphanages = await Orphanage.findAll();

      res.status(200).json(orphanages);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = orphanageController;
