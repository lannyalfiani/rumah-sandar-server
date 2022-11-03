'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Match.belongsTo(models.Orphan)
      Match.belongsTo(models.Volunteer)
    }
  }
  Match.init({
    VolunteerId: DataTypes.INTEGER,
    OrphanId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    hour: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};