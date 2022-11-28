const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const ExpenseCategory =  sequelize.define(
    "ExpenseCategory",
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
      
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      
    },
    {
      sequelize,
      timestamps: true,
      modelName: "ExpenseCategory",
    }
  );

  module.exports = ExpenseCategory;