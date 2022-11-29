const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Inquiry =  sequelize.define(
    "Inquiry",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      client: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      purchase_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration_of_stay: {
        type: DataTypes.FLOAT,
      
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      property_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lead_agent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      properties_visited: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      commencement_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      closure_date: {
        type: DataTypes.DATE,
      },
      contract_signed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      priority: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
      remarks: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.STRING,
       
      },

    },
    {
      sequelize,
      timestamps: true,
      modelName: "Inquiry",
    }
  );

  module.exports = Inquiry;