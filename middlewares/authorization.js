const { Orphan, Volunteer, Match } = require("../models");
const AuthorizationRequestMatch = async (req, res, next) => {
  try {
    let { role, id } = req.user;
    if (role !== "orphan") {
      throw { name: "Forbidden" };
    }
    let LoginOrphan = await Orphan.findByPk(id);
    if (LoginOrphan.matchStatus == "alreadyMatch") {
      throw { name: "Forbidden" };
    }
    let alreadyRequestMatch = await Match.findOne({
      where: {
        OrphanId: id,
      },
    });
    if (alreadyRequestMatch) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};
const AuthorizationVolunteerRequestAndGet = async (req, res, next) => {
  try {
    console.log(req.user);
    let { role, id } = req.user;
    if (role == "orphan") {
      throw { name: "Forbidden" };
    }
    if (role == "volunteer") {
      let LoginVolunteer = await Volunteer.findByPk(id);
      if (LoginVolunteer.matchStatus == "alreadyMatch") {
        throw { name: "Forbidden" };
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AuthorizationRequestMatch,
  AuthorizationVolunteerRequestAndGet,
};
