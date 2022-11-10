'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orphanage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orphanage.hasMany(models.Orphan)
      // define association here
    }
  }
  Orphanage.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    personInCharge: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orphanage',
  });
  return Orphanage;
};