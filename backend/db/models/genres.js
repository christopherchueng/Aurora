const genres = [
    'Alternative Rock',
    'Ambient',
    'Classical',
    'Country',
    'Dance & EDM',
    'Dancehall',
    'Deep House',
    'Disco',
    'Drum & Bass',
    'Dubstep',
    'Electronic',
    'Folk & Singer-Songwriter',
    'Hip-Hop & Rap',
    'House',
    'Indie',
    'Jazz & Blues',
    'K-Pop',
    'Latin',
    'Metal',
    'Piano',
    'Pop',
    'R&B & Soul',
    'Reggae',
    'Reggaeton',
    'Rock',
    'Soundtrack',
    'Techno',
    'Trance',
    'Trap',
    'Triphop',
    'World'
]

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("__genres__", {});
  };

  module.exports.genres = genres;
