'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DonationId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Donations`,
          key: `id`
        },
        onDelete: `cascade`,
        onUpdate: `cascade`
      },
      amount: {
        type: Sequelize.INTEGER
      },
      transactionStatus: {
        type: Sequelize.STRING
      },
      // VolunteerId: {
      //   type: Sequelize.INTEGER,
        // references: {
        //   model: `Volunteers`,
        //   key: `id`
        // },
        // onDelete: `cascade`,
        // onUpdate: `cascade`
      // },
      email: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      external_id: {
        type: Sequelize.STRING
      },
      paid_at: {
        type: Sequelize.DATE
      },
      payment_method: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Invoices');
  }
};