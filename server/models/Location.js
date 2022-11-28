const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Location =  sequelize.define(
    "Location",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    },
    {
      sequelize,
      timestamps: true,
      modelName: "Location",
    }
  );

  module.exports = Location;