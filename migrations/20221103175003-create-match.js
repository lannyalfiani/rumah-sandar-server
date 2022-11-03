'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      VolunteerId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Volunteers`,
          key: `id`
        },
        onDelete: `cascade`,
        onUpdate: `cascade`
      },
      OrphanId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Orphans`,
          key: `id`
        },
        onDelete: `cascade`,
        onUpdate: `cascade`
      },
      startDate: {
        type: Sequelize.DATE
      },
      hour: {
        type: Sequelize.TIME
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
    await queryInterface.dropTable('Matches');
  }
};