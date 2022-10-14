'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistTrack = sequelize.define('PlaylistTrack', {
    playlistId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER
  }, {});
  PlaylistTrack.associate = function(models) {
  };
  return PlaylistTrack;
};
