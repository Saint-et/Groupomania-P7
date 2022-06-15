const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});

const { models } = require('../db/mysql')

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');

  class User extends Model {}

          User.init({
          firstName: {
            type: DataTypes.STRING,
            allowNull: false
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false
          },
          imageUrl: {
            type: DataTypes.STRING
          },
          isAdmin: {
            type: DataTypes.BOOLEAN,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false
          }
        },
     {
      sequelize,
      modelName: 'users',
      tableName: 'users'
    });

module.exports = User