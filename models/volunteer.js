'use strict';
const {
  Model
} = require('sequelize');
const { createHashPassword } = require('../helpers/helpers')
module.exports = (sequelize, DataTypes) => {
  class Volunteer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Volunteer.hasOne(models.Match)
      Volunteer.hasMany(models.Invoice)
    }
  }
  Volunteer.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    role: DataTypes.STRING,
    verified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Volunteer',
  });

  Volunteer.beforeCreate((instance) => {
    instance.password = createHashPassword(instance.password)
    instance.verified = false
  })


  return Volunteer;
};