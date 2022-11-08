'use strict';

const { createHashPassword } = require("../helpers/helpers");

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/volunteer.json").map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = createHashPassword(`${el.password}`)
      el.role = "volunteer"
        el.curriculumVitae = "https://cdn-images.zety.com/images/zety/landings/examples/academic-cv-example@3x.png"
      return el
    })

    await queryInterface.bulkInsert('Volunteers', data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Volunteers', null, {})
  }
};

// 20221106182147-seedVolunteer.js