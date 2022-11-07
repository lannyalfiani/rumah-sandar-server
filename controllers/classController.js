const {
  Match,
  Class,
  ClassCategory,
  Orphan,
  sequelize,
} = require("../models/");

class classController {
  // static async getOneMatchSchedule(req, res, next) {
  //   try {
  //     let { matchId } = req.params;
  //     let Schedule = await Class.findAll({
  //       where: {
  //         MatchId: matchId,
  //       },
  //       include: [ClassCategory],
  //       order: [["date", "ASC"]],
  //     });
  //     if (!Schedule) {
  //       throw { name: "Data Not Found" };
  //     }
  //     res.status(200).json(Schedule);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  static async getScheduleClass(req, res, next) {
    console.log(req.body);
    try {
      const { role } = req.user;
      if (role === "volunteer") {
        let { id } = req.user;
        let schedule = await Match.findAll({
          where: {
            VolunteerId: id,
          },
          include: [{ model: Class, order: [["date", "DESC"]] }],
        });
        res.status(200).json(schedule);
      } else if (role === "orphan") {
        let { id } = req.user;
        let schedule = await Match.findAll({
          where: {
            OrphanId: id,
          },
          include: [Class],
        });
        res.status(200).json(schedule);
      } 
      //! admin harusnya bisa liat semua
      // else {
      //   throw { name: "Data Not Found" };
      // }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = classController;
