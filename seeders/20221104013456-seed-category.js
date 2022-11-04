'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../data/categories.json")
    data.forEach(el => {
      el.updatedAt = el.createdAt = new Date()
      
    });
    await queryInterface.bulkInsert("ClassCategories", data, {});
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete("ClassCategories", null, {});
    
  }
};
