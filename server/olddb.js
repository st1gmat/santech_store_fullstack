const {Sequelize} = require("sequelize")

module.exports = new Sequelize(
 process.env.DB_NAME, // название бд
 process.env.DB_USER, // имя пользователя
 process.env.DB_PASSWORD, // пароль от бд
 {
    dialect:'postgres', // диалект бд
    host: process.env.DB_HOST, // хост
    port: process.env.DB_PORT // порт
 }
)

// const { Sequelize } = require('sequelize');
// const env = process.env.NODE_ENV || 'development';
// const config = require('./config/config.json')[env];

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   {
//     dialect: config.dialect,
//     host: config.host,
//   }
// );

// module.exports = sequelize;