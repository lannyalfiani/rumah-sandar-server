const { verifyTokenToPayload } = require("../helpers/helpers");

const { Volunteer, Orphan, Admin } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "Invalid Email/Password" };
    const payload = verifyTokenToPayload(access_token);

    if (payload.role === "volunteer") {
      const volunteer = await Volunteer.findByPk(payload.id);
      if (!volunteer) throw { name: "Invalid Email/Password" };
      if (!volunteer.verified) throw { name: "You are not verified" };
      // di ubah ke req user biar general, karna hanya bisa satu login
      // console.log(volunteer, "ini di authen volun");
      req.user = {
        id: volunteer.id,
        fullname: volunteer.fullName,
        email: volunteer.email,
        role: volunteer.role,
      };
    } else if (payload.role === "orphan") {
      const orphan = await Orphan.findByPk(payload.id);
      if (!orphan) throw { name: "Invalid Email/Password" };
      if (!orphan.verified) throw { name: "You are not verified" };
      // di ubah ke req user biar general, karna hanya bisa satu login
      console.log(orphan, "ini di authen orphan");
      req.user = {
        id: orphan.id,
        fullname: orphan.fullName,
        email: orphan.email,
        role: orphan.role,
      };
    } else {
      const admin = await Admin.findByPk(payload.id);
      if (!admin) throw { name: "Invalid Email/Password" };
      req.user = {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
