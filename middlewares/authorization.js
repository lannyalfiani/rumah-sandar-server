const { Orphan, Volunteer } = require("../models");
const AuthorizationRequestMatch = async (req, res, next) => {
  try {
    console.log(req.user);
    let { role, id } = req.user;
    if (role !== "orphan") {
      throw { name: "Forbidden" };
    }
    let LoginOrphan = await Orphan.findByPk(id);
    if (LoginOrphan.matchStatus == "alreadyMatch") {
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
    if (role == "volunteer" || role == "admin") {
      throw { name: "Forbidden" };
    }
    let LoginVolunteer = await Volunteer.findByPk(id);
    if (LoginVolunteer.matchStatus == "alreadyMatch") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AuthorizationRequestMatch,
  AuthorizationVolunteerRequestAndGet,
};
