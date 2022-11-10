'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/donations.json").map(el => {
      let future = new Date()
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.validUntil = new Date(future.setDate(future.getDate() + 30))
      return el
    })

    await queryInterface.bulkInsert('Donations', data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Donations', null, {})
  }
};
