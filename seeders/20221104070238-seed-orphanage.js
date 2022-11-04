"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/orphanages.json");
    data.forEach((el) => {
      el.updatedAt = el.createdAt = new Date();
    });
    await queryInterface.bulkInsert("Orphanages", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orphanages", null, {});
  },
};
