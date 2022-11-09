const { Op } = require("sequelize");
let { Admin, Orphan, Volunteer, Match } = require("../models");
class checkUserController {
  static async getUserLogin(req, res, next) {
    try {
      let { id, role } = req.user;
      if (role === "admin") {
        let userLogin = await Admin.findByPk(id, {
          attributes: {
            exclude: ["password"],
          },
        });
        res.status(200).json(userLogin);
      } else if (role === "orphan") {
        let userLogin = await Orphan.findByPk(id, {
          attributes: {
            exclude: ["password"],
          },
        });
        console.log(userLogin, "--------------------------------");
        res.status(200).json(userLogin);
      } else if (role === "volunteer") {
        let userLogin = await Volunteer.findByPk(id, {
          attributes: {
            exclude: ["password"],
          },
        });
        res.status(200).json(userLogin);
      } else {
        throw { name: "Forbidden" };
      }
    } catch (error) {
      next(error);
    }
  }
  static async matchStudyPair(req, res, next) {
    try {
      let { id, role } = req.user;
      let today = new Date();
      //   console.log(id, res);
      if (role === "volunteer") {
        let findMatch = await Match.findAll({
          where: {
            VolunteerId: id,
            endDate: {
              [Op.or]: {
                [Op.gt]: today,
                [Op.eq]: null,
              },
            },
          },
          include: [
            {
              model: Volunteer,
              attributes: {
                exclude: ["password"],
              },
            },
            {
              model: Orphan,
              attributes: {
                exclude: ["password"],
              },
            },
          ],
        });
        res.status(200).json(findMatch);
      } else if (role === "orphan") {
        let findMatch = await Match.findAll({
          where: {
            OrphanId: id,
            endDate: {
              [Op.or]: {
                [Op.gt]: today,
                [Op.eq]: null,
              },
            },
          },
          include: [
            {
              model: Volunteer,
              attributes: {
                exclude: ["password"],
              },
            },
            {
              model: Orphan,
              attributes: {
                exclude: ["password"],
              },
            },
          ],
        });
        res.status(200).json(findMatch);
      } else {
        let findMatch = await Match.findAll({
          where: {
            endDate: {
              [Op.or]: {
                [Op.gt]: today,
                [Op.eq]: null,
              },
            },
          },
          include: [
            {
              model: Volunteer,
              attributes: {
                exclude: ["password"],
              },
            },
            {
              model: Orphan,
              attributes: {
                exclude: ["password"],
              },
            },
          ],
        });

        res.status(200).json(findMatch);
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = checkUserController;
