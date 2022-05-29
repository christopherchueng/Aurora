'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Comments', [
      {
        message: 'This is fire!',
        trackId: 1,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 1,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 1,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 1,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 1,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 2,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 2,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 2,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 2,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 3,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 3,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 3,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 3,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 3,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 4,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 4,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 4,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 4,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 4,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 5,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 5,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 5,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 5,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 5,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 6,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 6,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 6,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 6,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 6,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 6,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 6,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 6,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 6,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 6,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 7,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 7,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 7,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 7,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 7,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 8,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 8,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 8,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 8,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 8,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 9,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 9,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 9,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 9,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 9,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 10,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 10,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 10,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 10,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 10,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 11,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 11,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 11,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 11,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 11,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 12,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 12,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 12,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 12,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 12,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 13,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 13,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 13,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 13,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 13,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 14,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 14,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 14,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 14,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 14,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 15,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 15,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 15,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 15,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 15,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 16,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 16,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 16,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 16,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 16,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 17,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 17,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 17,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 17,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 17,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 18,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 18,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 18,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 18,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'This is fire!',
        trackId: 18,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
