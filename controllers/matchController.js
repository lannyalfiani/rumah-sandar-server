const { Op } = require("sequelize");
const { bulkSchedule, getEach7Day } = require("../helpers/getEach7Day");
const nodeMailer = require("../helpers/nodemailer");
const {
  Match,
  Class,
  ClassCategory,
  Orphan,
  Orphanage,
  sequelize,
  Volunteer,
} = require("../models/");

class matchController {
  static async RequestToMatch(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let { id } = req.user;

      await Match.create(
        {
          OrphanId: id,
        },
        { transaction: t }
      );
      t.commit();
      res.status(201).json({ message: "Create Request Success" });
    } catch (error) {
      t.rollback();
      next(error);
    }
  }

  static async getAllMatch(req, res, next) {
    try {
      let response = await Match.findAll({
        include: [
          {
            model: Orphan,
            attributes: {
              exclude: [`password`],
            },
            include: [Orphanage],
          },
          {
            model: Volunteer,
            attributes: {
              exclude: [`password`],
            },
          },
        ],
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
      console.log(req.body)
      let { matchId } = req.params;
      let VolunteerId = req.user.id;
      console.log(matchId)
      let { startDate, hour } = req.body;
      if (!startDate || !hour) throw { name: "required" };
      let endDate = getEach7Day(startDate, 11);
      let volunteerMatch = await Volunteer.findByPk(VolunteerId, {
        include: [Match],
      });
      let matchData = await Match.findByPk(matchId, { transaction: t });
      if (!matchData) {
        throw { name: "Not Found" };
      }
      console.log(matchData, "ini matchnya")
      let orphanMatch = await Orphan.findByPk(matchData.OrphanId, {
        transaction: t,
      });
      console.log(orphanMatch, "ini orphannya")
      if (orphanMatch.matchStatus === "alreadyMatch") {
        throw { name: "Adik already been choose by other kakak" };
      }
      await Match.update(
        { VolunteerId, OrphanId: matchData.OrphanId, startDate, hour, endDate },
        {
          where: {
            id: matchId,
          },
          transaction: t,
        }
      );
      await Volunteer.update(
        {
          matchStatus: "alreadyMatch",
        },
        {
          where: {
            id: volunteerMatch.id,
          },
          transaction: t,
        }
      );
      await Orphan.update(
        {
          matchStatus: "alreadyMatch",
        },
        {
          where: {
            id: orphanMatch.id,
          },
          transaction: t,
        }
      );
      let schedule = bulkSchedule(matchId, startDate);
      await Class.bulkCreate(schedule, { transaction: t });
      await t.commit();

      nodeMailer(
        volunteerMatch.email,
        "Kamu Telah Memilih Adik Ajar",
        `Kakak Ajar ${volunteerMatch.fullName} anda telah memiliki Adik Ajar bernama ${orphanMatch.fullName} semoga kalian dapat berkembang dengan baik`
      );
      nodeMailer(
        orphanMatch.email,
        "Kamu Telah Mendapatkan Kakak Ajar",
        `Adik Ajar ${orphanMatch.fullName} anda telah memiliki Kakak Ajar bernama ${volunteerMatch.fullName} semoga kalian dapat berkembang dengan baik`
      );
      res
        .status(201)
        .json({ message: "Submit Success, and Schedule has been created" });
    } catch (error) {
      next(error);
      await t.rollback();
    }
  }

  static async fetchMatchById(req, res, next) {
    try {
      let data = await Match.findByPk(req.params.matchId, {
        include: [
          {
            model: Orphan,
            attributes: {
              exclude: [`password`],
            },
          },
          {
            model: Volunteer,
            attributes: {
              exclude: [`password`],
            },
          },
        ],
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = matchController;
