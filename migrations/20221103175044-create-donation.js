'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Donations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      totalAmount: {
        type: Sequelize.INTEGER
      },
      validUntil: {
        type: Sequelize.DATE
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      on_demand_link: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      paymentLinkURL: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Donations');
  }
};