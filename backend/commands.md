npx sequelize model:generate --name Track --attributes title:string,description:text,genre:string,trackPath:string,imagePath:string,userId:integer
npx sequelize model:generate --name Comment --attributes message:string,trackId:integer,userId:integer
npx sequelize model:generate --name Like --attributes trackId:integer,userId:integer

npx sequelize seed:generate --name trackSeeds
npx sequelize seed:generate --name commentSeeds
npx sequelize seed:generate --name likeSeeds

npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all


<!-- Tracks -->


<!-- Comments -->


<!-- Likes -->
