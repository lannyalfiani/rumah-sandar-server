"use strict";

const { createHashPassword } = require("../helpers/helpers");



module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/admin.json").map(el => {
      el.role = "admin",
        el.createdAt = new Date(),
        el.updatedAt = new Date(),
        el.password = createHashPassword(el.password)
      return el
    })
    await queryInterface.bulkInsert("Admins", data, {});

    // await queryInterface.bulkInsert(
    //   "Admins",
    //   [
    //     {
    //       email: "lanny@mail.com",
    //       password: createHashPassword("123456"),
    //       role: "admin",
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", null, {});
  },
};
