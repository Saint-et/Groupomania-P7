'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@groupomania.com',
      password: '$2b$10$vHmfYTTil9p.AFBsyzOwceUC5CwNspYbdNlQ13pY2slmSEk.HUcv.',
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
