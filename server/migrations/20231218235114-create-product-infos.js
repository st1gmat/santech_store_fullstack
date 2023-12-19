'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_infos', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      title: {type: Sequelize.STRING, allowNull: false},
      description: {type: Sequelize.STRING, allowNull: false},
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
    await queryInterface.dropTable('product_infos');
  }
};