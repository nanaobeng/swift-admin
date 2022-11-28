const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const User =  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hashed_password: {
        type: DataTypes.STRING,
      },
      reset_token: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "User",
    }
  );

  module.exports = User;