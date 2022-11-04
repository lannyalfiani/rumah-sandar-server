const { verifyTokenToPayload } = require("../helpers/helpers");

const { Volunteer, Orphan } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "Invalid Email/Password" };
    const payload = verifyTokenToPayload(access_token);

    if (payload.role === "volunteer") {
      const volunteer = Volunteer.findByPk(payload.id);
      if (!volunteer) throw { name: "Invalid Email/Password" };

      req.volunteer = {
        id: volunteer.id,
        fullname: volunteer.fullname,
        email: volunteer.email,
        role: volunteer.role,
      };
    } else {
      const orphan = Orphan.findByPk(payload.id);
      if (!orphan) throw { name: "Invalid Email/Password" };

      req.orphan = {
        id: orphan.id,
        fullname: orphan.fullname,
        email: orphan.email,
        role: orphan.role,
      };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
