'use strict';

const { genres } = require('./genres')
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    genre: {
      type: DataTypes.ENUM(genres),
      values: genres
    },
    trackPath: DataTypes.STRING,
    imagePath: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Track.associate = function(models) {
    Track.belongsTo(models.User, { foreignKey: 'userId' })
    Track.hasMany(models.Like, { foreignKey: 'trackId', onDelete: 'CASCADE', hooks: true })
    Track.hasMany(models.Comment, { foreignKey: 'trackId', onDelete: 'CASCADE', hooks: true })
    Track.belongsToMany(models.Playlist, {
      through: 'PlaylistTrack',
      otherKey: 'playlistId',
      foreignKey: 'trackId'
    })
  };
  return Track;
};
