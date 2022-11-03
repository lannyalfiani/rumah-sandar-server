const { Op } = require("sequelize");
const { Match, Class, ClassCategory, Orphan } = require("../models/");

class matchController {
  static async getAllMatch(req, res, next) {
    try {
      let response = await Match.findAll({
        include: [Orphan],
        where: {
          VolunteerId: {
            [Op.is]: null,
          },
        },
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = matchController;
