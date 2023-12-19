'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.types);
      products.belongsTo(models.brands);
      products.belongsTo(models.categories);
      products.hasMany(models.product_infos, {as: 'info'});
      products.hasMany(models.basket_products);
      products.hasMany(models.order_products);
      products.belongsTo(models.legals);
    }
  }
  products.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    img: DataTypes.STRING,
    _info: DataTypes.TEXT,
    amount: DataTypes.INTEGER,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};