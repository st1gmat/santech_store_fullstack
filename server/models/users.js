const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.hasOne(models.baskets);
    }
  }

  users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });

  return users;
};
