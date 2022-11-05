const { verifyTokenToPayload } = require("../helpers/helpers");

const { Volunteer, Orphan } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "Invalid Email/Password" };
    const payload = verifyTokenToPayload(access_token);

    if (payload.role === "volunteer") {
      const volunteer = await Volunteer.findByPk(payload.id);
      if (!volunteer) throw { name: "Invalid Email/Password" };
      // di ubah ke req user biar general, karna hanya bisa satu login
      req.user = {
        id: volunteer.id,
        fullname: volunteer.fullName,
        email: volunteer.email,
        role: volunteer.role,
      };
    } else {
      const orphan = await Orphan.findByPk(payload.id);
      if (!orphan) throw { name: "Invalid Email/Password" };
      // di ubah ke req user biar general, karna hanya bisa satu login
      req.user = {
        id: orphan.id,
        fullname: orphan.fullName,
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
