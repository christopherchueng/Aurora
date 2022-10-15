'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('PlaylistTracks', [
      {
        playlistId: 1,
        trackId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 1,
        trackId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 1,
        trackId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 1,
        trackId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 1,
        trackId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 2,
        trackId: 18,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 2,
        trackId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 2,
        trackId: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 3,
        trackId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 3,
        trackId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 3,
        trackId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 4,
        trackId: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 4,
        trackId: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 5,
        trackId: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 5,
        trackId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 5,
        trackId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 6,
        trackId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 6,
        trackId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 6,
        trackId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 6,
        trackId: 4,
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
    return queryInterface.bulkDelete('PlaylistTracks', null, {});
  }
};
