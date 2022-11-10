"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orphans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      OrphanageId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Orphanages`,
          key: `id`,
        },
        onDelete: `cascade`,
        onUpdate: `cascade`,
      },
      role: {
        type: Sequelize.STRING,
      },
      verified: {
        type: Sequelize.BOOLEAN,
      },
      matchStatus: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orphans");
  },
};
