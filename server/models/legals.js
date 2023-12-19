'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class legals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      legals.hasMany(models.products);
    }
  }
  legals.init({
    name: DataTypes.STRING,
    legal_p: DataTypes.STRING,
    descr: DataTypes.STRING,
    type: DataTypes.STRING,
    phone: DataTypes.STRING,
    located: DataTypes.STRING,
    bill: DataTypes.STRING,
    inn: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'legals',
  });
  return legals;
};