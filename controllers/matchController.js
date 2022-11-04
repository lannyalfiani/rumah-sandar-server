const { Op } = require("sequelize");
const { bulkSchedule } = require("../helpers/getEach7Day");
const {
  Match,
  Class,
  ClassCategory,
  Orphan,
  sequelize,
} = require("../models/");

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
  static async AddVolunteerToMatch(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let { matchId } = req.params;
      let VolunteerId = 1;
      //   let {date} = req.body
      let { startDate } = req.body;
      let matchData = await Match.findByPk(matchId, { transaction: t });
      if (!matchData) {
        throw { name: "Data Not Found" };
      }
      await Match.update(
        { VolunteerId },
        {
          where: {
            id: matchId,
          },
        },
        { transaction: t }
      );
      let schedule = bulkSchedule(matchId, startDate);
      await Class.bulkCreate(schedule, { transaction: t });
      await t.commit();
      res
        .status(201)
        .json({ message: "Add Data Success, and Schedule has been created" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}
module.exports = matchController;
