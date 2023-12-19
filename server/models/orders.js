'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orders.belongsTo(models.users);
      orders.hasMany(models.order_products);
      orders.hasOne(models.users);
    }
  }
  orders.init({
    phone: DataTypes.STRING,
    postcode: DataTypes.STRING,
    addressee: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};