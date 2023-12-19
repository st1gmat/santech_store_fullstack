'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_products.belongsTo(models.orders);
      order_products.belongsTo(models.products);
    }
  }
  order_products.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  }, {
    sequelize,
    modelName: 'order_products',
  });
  return order_products;
};