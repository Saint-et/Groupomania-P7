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
          password: {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
          }
        },
     {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'users', // We need to choose the model name
      tableName: 'users'
    });

module.exports = User