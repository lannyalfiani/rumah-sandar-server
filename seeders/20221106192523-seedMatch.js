'use strict';

const { getEach7Day } = require("../helpers/getEach7Day");

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/match.json").map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.startDate = new Date()
      el.endDate = getEach7Day(el.startDate, 7)
      return el
    })

    await queryInterface.bulkInsert('Matches', data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Matches', null, {})
  }
};