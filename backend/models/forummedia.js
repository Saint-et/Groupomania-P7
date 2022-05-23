const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});


// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');

  class Messagemedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Messagemedia.init({
    messageId: {
      type: DataTypes.NUMBER,
    },
    titleMessage: {
      type: DataTypes.STRING,
      allowNull: false
      // allowNull defaults to true
    },
    message: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    // Model attributes are defined here
    image: {
      type: DataTypes.STRING,
    }},{
    sequelize,
    modelName: 'forum',
    tableName: 'forum'
  });
  
  module.exports = Messagemedia;