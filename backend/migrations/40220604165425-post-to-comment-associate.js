'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('comments', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'associate_post',
      references: {
        table: 'post',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('comments', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'associate_post',
      references: {
        table: 'post',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  }
};
