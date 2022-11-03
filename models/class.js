'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Class.belongsTo(models.Match)
      Class.belongsTo(models.ClassCategory)
      // define association here
    }
  }
  Class.init({
    MatchId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    date: DataTypes.DATE,
    ClassCategoryId: DataTypes.INTEGER,
    verifiedByOrphan: DataTypes.BOOLEAN,
    verifiedByVolunteer: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};