genre:string,trackPath:string,imagePath:string,userId:integer
npx sequelize model:generate --name Comment --attributes message:string,trackId:integer,userId:integer
npx sequelize model:generate --name Like --attributes trackId:integer,userId:integer
npx sequelize model:generate --name Playlist --attributes name:string,userId:integer
npx sequelize model:generate --name PlaylistTrack --attributes playlistId:integer,trackId:integer

npx sequelize seed:generate --name trackSeeds
npx sequelize seed:generate --name commentSeeds
npx sequelize seed:generate --name likeSeeds
npx sequelize seed:generate --name playlistSeeds
npx sequelize seed:generate --name playlistTrackSeeds

npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all

Heroku commands:

heroku login
git push heroku main

heroku run npm run sequelize db:seed:undo:all
heroku run npm run sequelize db:migrate:undo:all
heroku run npm run sequelize db:migrate
heroku run npm run sequelize db:seed:all

<!-- Tracks -->
{
  title: 'All I Got Mashup',
  description: 'Test description',
  genre: 'EDM',
  trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/All+I+Got+X+Moments+X+Sound++Walking+Away+Mashup.mp3',
  imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/All+I+Got+Mashup+Cover.jpeg',
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  title: 'Clarity (Remix)',
  description: 'Test description',
  genre: 'EDM',
  trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Clarity+(Remix).mp3',
  imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Clarity+Cover.jpeg',
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  title: 'Shelter',
  description: 'Test description',
  genre: 'EDM',
  trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Shelter.mp3',
  imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Shelter+Cover.jpeg',
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  title: 'Get It Right',
  description: 'Test description',
  genre: 'R&B',
  trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Get+It+Right.mp3',
  imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Get+It+Right+Cover.jpeg',
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  title: '0.03',
  description: 'Test description',
  genre: 'R&B',
  trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/0.03.mp3',
  imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/0.03+Cover.webp',
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  title: 'Mo Freaky',
  description: 'Test description',
  genre: 'R&B',
  trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Mo+Freaky.mp3',
  imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Mo+Freaky+Cover.jpeg',
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  title: 'Boom',
  description: 'Test description',
  genre: 'Hip-Hop/Rap',
  trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Boom+Just+Fired.mp3',
  imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Boom+Cover.jpeg',
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  title: 'Bruce Wayne',
  description: 'Test description',
  genre: 'Hip-Hop/Rap',
  trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Bruce+Wayne.mp3',
  imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Bruce+Wayne+Cover.webp',
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  title: 'N95',
  description: 'Test description',
  genre: 'Hip-Hop/Rap',
  trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/N95.mp3',
  imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/N95+Cover.png',
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
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
{
  title: '2AM (Cover)',
  description: 'Test description',
  genre: 'R&B',
  trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/2AM+(Cover).mp3',
  imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/2AM+Cover.jpeg',
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  title: 'Stuck',
  description: 'Test description',
  genre: 'R&B',
  trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Stuck.mp3',
  imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Stuck+Cover.png',
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
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
{
  title: 'Weak',
  description: 'Test description',
  genre: 'Pop',
  trackPath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Weak.mp3',
  imagePath: 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/Weak+Cover.jpeg',
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
}

<!-- Comments -->
{
  message: 'This is fire!',
  trackId: 1,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 1,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 1,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 1,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 1,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 2,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 2,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 2,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 2,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 2,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 3,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 3,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 3,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 3,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 3,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 4,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 4,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 4,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 4,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 4,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 5,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 5,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 5,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 5,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 5,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 6,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 6,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 6,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 6,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 6,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 6,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 6,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 6,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 6,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 6,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 7,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 7,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 7,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 7,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 7,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 8,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 8,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 8,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 8,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 8,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 9,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 9,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 9,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 9,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 9,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 10,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 10,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 10,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 10,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 10,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 11,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 11,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 11,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 11,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 11,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 12,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 12,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 12,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 12,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 12,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 13,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 13,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 13,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 13,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 13,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 14,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 14,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 14,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 14,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 14,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 15,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 15,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 15,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 15,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 15,
  userId: 6,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 16,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 16,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 16,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 16,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 16,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 17,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 17,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 17,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 17,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 17,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 18,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 18,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 18,
  userId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 18,
  userId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  message: 'This is fire!',
  trackId: 18,
  userId: 5,
  createdAt: new Date(),
  updatedAt: new Date()
}

<!-- Likes -->
