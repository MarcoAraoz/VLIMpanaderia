// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bakery', 'postgres', 'marcoa', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
