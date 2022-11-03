'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invoice.belongsTo(models.Donation)
      Invoice.belongsTo(models.Volunteer)
      // define association here
    }
  }
  Invoice.init({
    DonationId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    transactionStatus: DataTypes.STRING,
    VolunteerId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};