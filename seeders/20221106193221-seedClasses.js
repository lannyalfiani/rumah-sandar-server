'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/class.json").map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.date = new Date()
      return el
    })

    await queryInterface.bulkInsert('Classes', data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Classes', null, {})
  }
};