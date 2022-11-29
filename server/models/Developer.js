const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Developer =  sequelize.define(
    "Developer",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
    
      },
      contract_period: {
        type: DataTypes.STRING,
       
      },
      rent_commission: {
        type: DataTypes.FLOAT,
      
      },
      sale_commission: {
        type: DataTypes.FLOAT,
       
      },
      contact_person: {
        type: DataTypes.STRING
      },
      contact_phone: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      },
      remarks: {
        type: DataTypes.TEXT
      }

    },
    {
      sequelize,
      timestamps: true,
      modelName: "Developer",
    }
  );

  module.exports = Developer;