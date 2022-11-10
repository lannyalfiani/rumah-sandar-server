'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Donation.hasMany(models.Invoice)
    }
  }
  Donation.init({
    name: {
      type: DataTypes.STRING
    },
    totalAmount: DataTypes.INTEGER,
    validUntil: DataTypes.DATE,
    imgUrl: DataTypes.STRING,
    on_demand_link: DataTypes.STRING,
    paymentLinkURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Donation',
  });
  return Donation;
};