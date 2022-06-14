const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});

const { models } = require('../db/mysql')

// Connection à la Base de donné (DATAbase)
const sequelize = require('../db/mysql');


  class Comments extends Model {}


  Comments.init({

    comment: {
      type: DataTypes.STRING
    },
    userId: {
      type:DataTypes.INTEGER
    },
    postId: {
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'comments',
    tableName: 'comments'
  });
  
  sequelize.models.users.hasMany(Comments, {foreignKey: 'userId', sourceKey: 'id'});
  Comments.belongsTo(sequelize.models.users, {foreignKey: 'userId', targetKey: 'id'});

  sequelize.models.post.hasMany(Comments, {foreignKey: 'postId', sourceKey: 'id'});
  Comments.belongsTo(sequelize.models.post, {foreignKey: 'postId', targetKey: 'id'});

  module.exports = Comments
