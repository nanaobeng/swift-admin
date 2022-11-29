const express = require("express");
const router = express.Router();
const formidable = require('formidable');
const pool = require("../database/db");
require("dotenv").config();
const Property = require("../models/Property");


exports.createProperty = async (req, res) => {

    try {
      let form = new formidable.IncomingForm();
      form.parse(req, async (err, fields) => {
      const { 
        developer , email , purchase_type , location , property_type , 
        visits , rooms , price , remarks , status
      } = fields;
     
      const newRequest = await Property.findOne({ where: { client: `${client}` } });
  
      if (newRequest) {
        return res.status(401).json(
            {
                success: false,
                msg : "Property already exists!"
            }
            
            );
      }
      const newProperty = await Property.create({
        developer : developer ,
         email : email, 
         purchase_type : purchase_type, 
         location: location, 
         property_type : property_type, 
        visits : visits,
         rooms  : rooms,
          price : price , 
          remarks : remarks , 
          status : status
       
      });
  
      console.log("success");
      return res.json({ success: true ,
    msg : "Property Successfully Created"});
      })
      
    
  
      
  
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send( {
        success: false,
        msg : "Error occured during creation."
    });
    }
  };


  exports.getProperty = async (req, res) => {
    try {
    
      const { id } = req.params;
  
  
  
      const property = await Property.findOne({ where: { id: id } });
  
      if (property) {
        return res.status(200).json({success:true,data:property});
  
   
      } else {
        return res.status(401).json({ success:false,error: `Property not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  


  exports.getProperties = async (req, res) => {
    try {
    
    
  
  
  
      const properties = await Property.findAll();
  
      if (properties) {
        return res.status(200).json({success:true,data:properties});
  
   
      } else {
        return res.status(401).json({success:false,error:'No Properties Found'});
      }
    } catch (err) {
      console.log(err.message);
    }
  };


  exports.updateProperty = async (req, res) => {
    try {
    
  
    
  
      let form = new formidable.IncomingForm();
      form.parse(req, async (err, fields) => {
      const { developer , email , purchase_type , location , property_type , 
        visits , rooms , price , remarks , status,id} = fields;
      
      const property = await Property.findOne({ where: { id: id } });
      if (!property) {
        return res.status(401).json({success:false,msg:'Property not found'});
      }
      await Property.update(
        {
            developer : developer ,
            email : email, 
            purchase_type : purchase_type, 
            location: location, 
            property_type : property_type, 
           visits : visits,
            rooms  : rooms,
             price : price , 
             remarks : remarks , 
             status : status
        },
        {
          where: {
            id: id,
          },
        }
      );
  
      res.json({success:true,msg:"Property succesfully updated!"});
      })
  
   
  
    
  
    } catch (err) {
      console.log(err.message);
    }
  };
  
  
  
  exports.deleteProperty = async (req, res) => {
    try {
    

        const { id } = req.body;
  
  
  
      const property = await Property.findOne({ where: { id: id } });
  
      if (property) {
        await Property.destroy({
          where: {
            id: id,
          },
        });
  
        res.json({success:true,msg:"Property succesfully deleted!"});
      } else {
        return res.status(401).json({ success: false ,error: `Property not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  