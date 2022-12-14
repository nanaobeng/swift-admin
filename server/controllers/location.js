const express = require("express");
const router = express.Router();
const formidable = require('formidable');
const pool = require("../database/db");
require("dotenv").config();
const Location = require("../models/Location");


exports.createLocation = async (req, res) => {

    try {
      let form = new formidable.IncomingForm();
      form.parse(req, async (err, fields) => {
      const { city,region} = fields;
     
      const newRequest = await Question.findOne({ where: { city: `${city}` } });
  
      if (newRequest) {
        return res.status(401).json(
            {
                success: false,
                msg : "Location already exists!"
            }
            
            );
      }
      const newLocation = await Location.create({
        city: city,
        region: region,
       
      });
  
      console.log("success");
      return res.json({ success: true ,
    msg : "Question Successfully Created"});
      })
      
    
  
      
  
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send( {
        success: false,
        msg : "Error occured during creation."
    });
    }
  };


  exports.getLocation = async (req, res) => {
    try {
    
      const { id } = req.params;
  
  
  
      const location = await Location.findOne({ where: { id: id } });
  
      if (location) {
        return res.status(200).json({success:true,data:location});
  
   
      } else {
        return res.status(401).json({ success:false,error: `Location not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  


  exports.getLocations = async (req, res) => {
    try {
    
    
  
  
  
      const locations = await Location.findAll();
  
      if (locations) {
        return res.status(200).json({success:true,data:locations});
  
   
      } else {
        return res.status(401).json({success:false,error:'No Locations Found'});
      }
    } catch (err) {
      console.log(err.message);
    }
  };


  exports.updateLocation = async (req, res) => {
    try {
    
  
    
  
      let form = new formidable.IncomingForm();
      form.parse(req, async (err, fields) => {
      const { city,region , id} = fields;
      
      const location = await Location.findOne({ where: { id: id } });
      if (!location) {
        return res.status(401).json({success:false,msg:'Location not found'});
      }
      await Location.update(
        {
          city : city,
          region : region
        },
        {
          where: {
            id: id,
          },
        }
      );
  
      res.json({success:true,msg:"Location succesfully updated!"});
      })
  
   
  
    
  
    } catch (err) {
      console.log(err.message);
    }
  };
  
  
  
  exports.deleteLocation = async (req, res) => {
    try {
    

        const { id } = req.body;
  
  
  
      const location = await Location.findOne({ where: { id: id } });
  
      if (location) {
        await Location.destroy({
          where: {
            id: id,
          },
        });
  
        res.json({success:true,msg:"Location succesfully deleted!"});
      } else {
        return res.status(401).json({ success: false ,error: `Location not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  