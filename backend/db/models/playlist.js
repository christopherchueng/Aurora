'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Playlist.associate = function(models) {
    Playlist.belongsTo(models.User, { foreignKey: 'userId' })
    Playlist.belongsToMany(models.Track, {
      through: 'PlaylistTrack',
      otherKey: 'trackId',
      foreignKey: 'playlistId'
     })
  };
  return Playlist;
};
