const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Property =  sequelize.define(
    "Property",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
    
      },
      developer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
    
      },
      purchase_type: {
        type: DataTypes.STRING,
       
      },
      location: {
        type: DataTypes.STRING,
      
      },
      property_type: {
        type: DataTypes.STRING,
      },
      visits: {
        type: DataTypes.INTEGER
      },
      rooms: {
        type: DataTypes.INTEGER
      },
      price: {
        type: DataTypes.FLOAT
      },
      remarks: {
        type: DataTypes.TEXT
      },
      status: {
        type: DataTypes.STRING
      },

    },
    {
      sequelize,
      timestamps: true,
      modelName: "Property",
    }
  );

  module.exports = Property;