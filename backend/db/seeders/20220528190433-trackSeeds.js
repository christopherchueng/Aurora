'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Tracks', [
      // 1
      {
        title: 'All I Got Mashup',
        description: 'Test description',
        genre: 'Dance & EDM',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/All+I+Got+X+Moments+X+Sound+of+Walking+Away+Mashup.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/All+I+Got+Mashup+Cover.jpeg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 2
      {
        title: 'Clarity (Remix)',
        description: 'Test description',
        genre: 'Dance & EDM',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Clarity+(Remix).mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Clarity+Cover.jpeg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 3
      {
        title: 'Shelter',
        description: 'Test description',
        genre: 'Dance & EDM',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Shelter.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Shelter+Cover.jpeg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 4
      {
        title: 'Get It Right',
        description: 'Test description',
        genre: 'R&B & Soul',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Get+It+Right.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Get+It+Right+Cover.jpeg',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 5
      {
        title: '0.03',
        description: 'Test description',
        genre: 'R&B & Soul',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/0.03.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/0.03+Cover.webp',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 6
      {
        title: 'Mo Freaky',
        description: 'Test description',
        genre: 'R&B & Soul',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Mo+Freaky.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Mo+Freaky+Cover.jpeg',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 7
      {
        title: 'Boom',
        description: 'Test description',
        genre: 'Hip-Hop & Rap',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Boom+Just+Fired.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Boom+Cover.jpeg',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 8
      {
        title: 'Bruce Wayne',
        description: 'Test description',
        genre: 'Hip-Hop & Rap',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Bruce+Wayne.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Bruce+Wayne+Cover.webp',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 9
      {
        title: 'N95',
        description: 'Test description',
        genre: 'Hip-Hop & Rap',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/N95.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/N95+Cover.png',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 10
      {
        title: 'Boy With Luv',
        description: 'Test description',
        genre: 'K-Pop',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Boy+With+Luv.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Boy+With+Luv+Cover.jpeg',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 11
      {
        title: 'MIC Drop',
        description: 'Test description',
        genre: 'K-Pop',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/MIC+Drop.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/MIC+Drop+Cover.jpeg',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 12
      {
        title: 'SCIENTIST',
        description: 'Test description',
        genre: 'K-Pop',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/SCIENTIST.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/SCIENTIST+Cover.jpeg',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 13
      {
        title: 'The Feels',
        description: 'Test description',
        genre: 'K-Pop',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/The+Feels.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/The+Feels+Cover.jpeg',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 14
      {
        title: '2AM (Cover)',
        description: 'Test description',
        genre: 'R&B & Soul',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/2AM+(Cover).mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/2AM+Cover.jpeg',
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 15
      {
        title: 'Stuck',
        description: 'Test description',
        genre: 'R&B & Soul',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Stuck.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Stuck+Cover.png',
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 16
      {
        title: 'How Could You',
        description: 'Test description',
        genre: 'Pop',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/How+Could+You.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/How+Could+You+Cover.png',
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 17
      {
        title: 'Vintage',
        description: 'Test description',
        genre: 'Pop',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Vintage.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Vintage+Cover.jpeg',
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // 18
      {
        title: 'Weak',
        description: 'Test description',
        genre: 'Pop',
        trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Weak.mp3',
        imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Weak+Cover.jpeg',
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Tracks', null, {});
  }
};
