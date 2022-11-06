'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/match.json").map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Matches', data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Matches', null, {})
  }
};