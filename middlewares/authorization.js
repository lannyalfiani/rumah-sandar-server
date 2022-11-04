const { Orphan } = require("../models");
const AuthorizationRequestMatch = async (req, res, next) => {
  try {
    let { role } = req.user;
    if (role !== "Orphan") {
      throw { name: "Forbidden" };
    }
    let LoginOrphan = await Orphan.
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AuthorizationRequestMatch,
};
