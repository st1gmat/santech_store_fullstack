'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class basket_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      basket_products.belongsTo(models.baskets);
      basket_products.belongsTo(models.products);
    }
  }
  basket_products.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  }, {
    sequelize,
    modelName: 'basket_products',
  });
  return basket_products;
};