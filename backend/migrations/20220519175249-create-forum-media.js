'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('forumMedia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      messageId: {
        type: Sequelize.STRING
      },
      titleMessage: {
        type: Sequelize.STRING
      },
      imageMessage: {
        type: Sequelize.STRING
      },
      videoMessage: {
        type: Sequelize.STRING
      },
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
    await queryInterface.dropTable('forumMedia');
  }
};