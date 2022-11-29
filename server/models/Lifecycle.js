const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Lifecycle =  sequelize.define(
    "Lifecycle",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      inquiry_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      client: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pictures_sent: {
        type: DataTypes.BOOLEAN,
       
      },
     site_visited: {
        type: DataTypes.BOOLEAN,
       
      },
      resources_allocated: {
        type: DataTypes.BOOLEAN,
  
      },
      handler_assigned: {
        type: DataTypes.BOOLEAN,
  
      },
      handler: {
        type: DataTypes.STRING,
  
      },
      feedback_provided: {
        type: DataTypes.BOOLEAN,
  
      },
      validations_completed: {
        type: DataTypes.BOOLEAN,
  
      },
      docs_requested: {
        type: DataTypes.BOOLEAN,
  
      },
      ownership_verified: {
        type: DataTypes.BOOLEAN,
  
      },
      invoice_generated: {
        type: DataTypes.BOOLEAN,
  
      },
      payment_made: {
        type: DataTypes.BOOLEAN,
  
      },
      deal_closed: {
        type: DataTypes.BOOLEAN,
  
      },
      recieved_commission: {
        type: DataTypes.BOOLEAN,
  
      },
      lifecycle_status: {
        type: DataTypes.BOOLEAN,
  
      },
      
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Lifecycle",
    }
  );

  module.exports = Lifecycle;