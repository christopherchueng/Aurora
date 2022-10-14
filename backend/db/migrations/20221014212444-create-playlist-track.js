'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PlaylistTracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playlistId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Playlists' }
      },
      trackId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Tracks' }
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PlaylistTracks');
  }
};
