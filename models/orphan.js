'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orphan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orphan.belongsTo(models.Orphanage)
      Orphan.hasOne(models.Match)
    }
  }
  Orphan.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    OrphanageId: DataTypes.INTEGER,
    role: DataTypes.STRING,
    verified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Orphan',
  });

  Orphan.beforeCreate((instance) => {
    instance.password = createHashPassword(instance.password)
    instance.verified = false
  })


  return Orphan;
};