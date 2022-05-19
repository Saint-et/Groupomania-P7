const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});


// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');

  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Message.init({
    messageId: {
      type: DataTypes.NUMBER,
    },
    // Model attributes are defined here
    fromUser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    titleMessage: {
      type: DataTypes.STRING,
      allowNull: false
      // allowNull defaults to true
    },
    contentMessage: {
      type: DataTypes.STRING,
      allowNull: false
      // allowNull defaults to true
    }
  },{
    sequelize,
    modelName: 'Message',
    tableName: 'messages'
  });
  
  module.exports = Message;