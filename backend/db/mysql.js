const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});

// Connection à la Base de donné (DATAbase)


const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
  });
  
  
  try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
  } catch (error) {
  console.error('Unable to connect to the database:', error);
  }
  
 //console.log(sequelize.config);