const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});

const { models } = require('../db/mysql')

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');

  class Messagemedia extends Model {}
  

  Messagemedia.init({
    message: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    // Model attributes are defined here
    imageUrl: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.NUMBER,
      references: {
        model: models.users,
        key: 'id'
      }
    }
  },{
    sequelize,
    modelName: 'forum',
    tableName: 'forum'
  });

  sequelize.models.users.hasMany(Messagemedia, {foreignKey: 'userId', sourceKey: 'id'});
  Messagemedia.belongsTo(sequelize.models.users, {foreignKey: 'userId', targetKey: 'id'});

  module.exports = Messagemedia