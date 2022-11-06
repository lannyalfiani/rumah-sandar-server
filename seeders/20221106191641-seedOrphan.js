'use strict';

const { createHashPassword } = require("../helpers/helpers")

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/orphan.json").map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = createHashPassword(`${el.password}`)
      el.role = "orphan"
      el.matchStatus = "notMatch"
      el.verified = true
      return el
    })
    await queryInterface.bulkInsert('Orphans', data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orphans', null, {})
  }
};

// 20221106191641-seedOrphan.js