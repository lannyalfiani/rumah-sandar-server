'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MatchId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Matches`,
          key: `id`
        },
        onDelete: `cascade`,
        onUpdate: `cascade`
      },
      description: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATE
      },
      ClassCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: `ClassCategories`,
          key: `id`
        },
        onDelete: `cascade`,
        onUpdate: `cascade`
      },
      verifiedByOrphan: {
        type: Sequelize.BOOLEAN
      },
      verifiedByVolunteer: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Classes');
  }
};