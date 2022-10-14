'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Playlist.associate = function(models) {
    Playlist.belongsTo(models.User, { foreignKey: 'userId' })
    Playlist.hasMany(models.Track, { foreignKey: 'trackId', onDelete: 'CASCADE', hooks: true })
  };
  return Playlist;
};
