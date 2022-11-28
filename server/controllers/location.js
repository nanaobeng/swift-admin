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
        return res.status(200).json(location);
  
   
      } else {
        return res.status(401).json({ error: `Location not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  