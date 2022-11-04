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
      // Invoice.belongsTo(models.Volunteer)
      // define association here
    }
  }
  Invoice.init({
    DonationId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    transactionStatus: DataTypes.STRING,
    // VolunteerId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    external_id: DataTypes.STRING,
    paid_at: DataTypes.DATE,
    payment_method: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};