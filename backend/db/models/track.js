'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    genre: DataTypes.STRING,
    trackPath: DataTypes.STRING,
    imagePath: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Track.associate = function(models) {
    // associations can be defined here
  };
  return Track;
};