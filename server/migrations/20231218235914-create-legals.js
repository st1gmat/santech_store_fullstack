'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('legals', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      name: {type: Sequelize.STRING,  allowNull: false},
      legal_p: {type: Sequelize.STRING,  allowNull: false},
      descr: {type: Sequelize.STRING},
      type: {type: Sequelize.STRING, allowNull: false},
      phone: {type: Sequelize.STRING},
      located: {type: Sequelize.STRING,  allowNull: false},
      bill: {type: Sequelize.STRING,  allowNull: false},
      inn: {type: Sequelize.STRING, allowNull: false},
      comment: {type: Sequelize.STRING},
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
    await queryInterface.dropTable('legals');
  }
};