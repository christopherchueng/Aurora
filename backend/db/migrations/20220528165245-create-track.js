'use strict';

const { genres } = require('../models/genres')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.TEXT
      },
      genre: {
        allowNull: false,
        type: Sequelize.ENUM(genres)
      },
      trackPath: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imagePath: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/default-imagePath.png'
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
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
    return queryInterface.dropTable('Tracks');
  }
};
