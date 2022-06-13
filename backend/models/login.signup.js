const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});

const { models } = require('../db/mysql')

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');

  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    }
  }

          User.init({
          firstName: {
            type: DataTypes.STRING,
            allowNull: false
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
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
            // allowNull defaults to true
          }
        },
     {
      sequelize,
      modelName: 'users',
      tableName: 'users'
    });

module.exports = User