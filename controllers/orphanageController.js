const { Orphanage } = require("../models");

class orphanageController {
  static async getOrphanages(req, res, next) {
    try {
      let orphanages = await Orphanage.findAll();
      // kondisi dihilangkan karna kalau tidak ada biarkan array kosong bukan error
      // if(!orphanages) throw { name : "Not Found"}
      res.status(200).json(orphanages);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = orphanageController;
