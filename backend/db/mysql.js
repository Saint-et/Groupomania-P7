const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});


// Connection à la Base de donné (DATAbase)
module.exports = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
  });

  try {
    module.exports.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }

  
