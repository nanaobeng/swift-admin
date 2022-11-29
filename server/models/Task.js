const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Task =  sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipient: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
 
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      proposed_deadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },


      

    },
    {
      sequelize,
      timestamps: true,
      modelName: "Task",
    }
  );

  module.exports = Task;