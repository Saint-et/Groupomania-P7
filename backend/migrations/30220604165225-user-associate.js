'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('forum', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'associate_users',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('forum', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'associate_users',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  }
};
