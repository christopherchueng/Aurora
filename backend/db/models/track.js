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
    imagePath: {
      type: DataTypes.STRING,
      defaultValue: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/default-imagePath.png'
    },
    userId: DataTypes.INTEGER
  }, {});
  Track.associate = function(models) {
    // associations can be defined here
    Track.belongsTo(models.User, { foreignKey: 'userId' })
    Track.hasMany(models.Comment, { foreignKey: 'trackId', onDelete: 'CASCADE', hooks: true })
  };
  return Track;
};
