'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Likes', [
      {
        trackId: 1,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        trackId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        trackId: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        trackId: 15,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        trackId: 18,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        trackId: 3,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        trackId: 15,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        trackId: 18,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        trackId: 18,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        trackId: 18,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        trackId: 18,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Likes', null, {});
  }
};
