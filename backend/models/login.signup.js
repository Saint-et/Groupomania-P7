const { Sequelize, Op, Model, DataTypes, QueryTypes } = require('sequelize');
require("dotenv").config({path: "./env/.env"});

// Connection à la Base de donné (DATAbase)
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
  });

  

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
          userId: {
            type: DataTypes.NUMBER,
          },
          // Model attributes are defined here
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
          },
          isAdmin: {
              type: DataTypes.BOOLEAN,
          }
        },
         {
          // Other model options go here
          sequelize, // We need to pass the connection instance
          modelName: 'user', // We need to choose the model name
          tableName: 'users'
        });
        
      
        module.exports = User;
