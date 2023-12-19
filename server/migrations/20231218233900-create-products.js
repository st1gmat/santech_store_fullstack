'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      name: {type: Sequelize.STRING, unique: true, allowNull: false},
      price: {type: Sequelize.INTEGER, allowNull: false},
      img: {type: Sequelize.STRING, allowNull: false},
      _info:{type: Sequelize.TEXT, defaultValue: "Нет описания"},
      amount:{type: Sequelize.INTEGER, allowNull: false},
      country:{type: Sequelize.STRING, allowNull: false},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};