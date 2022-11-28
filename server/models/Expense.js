const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Expense =  sequelize.define(
    "Expense",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      month: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
  
      },
      
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Expense",
    }
  );

  module.exports = Expense;