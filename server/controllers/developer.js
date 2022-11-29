const express = require("express");
const router = express.Router();
const formidable = require('formidable');
const pool = require("../database/db");
require("dotenv").config();
const Developer = require("../models/Developer");


exports.createDeveloper = async (req, res) => {

    try {
      let form = new formidable.IncomingForm();
      form.parse(req, async (err, fields) => {
      const { name, email , type , contract_period , rent_commission , sale_commission , contact_person , contact_phone , status , remarks } = fields;
     
      const newRequest = await Developer.findOne({ where: { name: `${name}` } });
  
      if (newRequest) {
        return res.status(401).json(
            {
                success: false,
                msg : "Developer already exists!"
            }
            
            );
      }
      const newDeveloper = await Developer.create({
        name: name,
         email : email ,
          type  : type, 
          contract_period : contract_period,
           rent_commission : rent_commission,
            sale_commission : sale_commission ,
             contact_person  : contact_person,
              contact_phone : contact_phone, 
              status : status, 
              remarks : remarks
       
      });
  
      console.log("success");
      return res.json({ success: true ,
    msg : "Developer Successfully Created"});
      })
      
    
  
      
  
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send( {
        success: false,
        msg : "Error occured during creation."
    });
    }
  };


  exports.getDeveloper = async (req, res) => {
    try {
    
      const { id } = req.params;
  
  
  
      const developer = await Developer.findOne({ where: { id: id } });
  
      if (developer) {
        return res.status(200).json({success:true,data:developer});
  
   
      } else {
        return res.status(401).json({ success:false,error: `Developer not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  


  exports.getDevelopers = async (req, res) => {
    try {
    
    
  
  
  
      const developer = await Developer.findAll();
  
      if (developer) {
        return res.status(200).json({success:true,data:developer});
  
   
      } else {
        return res.status(401).json({success:false,error:'No Developers Found'});
      }
    } catch (err) {
      console.log(err.message);
    }
  };


  exports.updateDeveloper = async (req, res) => {
    try {
    
  
    
  
      let form = new formidable.IncomingForm();
      form.parse(req, async (err, fields) => {
      const { name, email , type , contract_period , rent_commission , sale_commission , contact_person , contact_phone , status , remarks ,id} = fields;
      
      const developer = await Developer.findOne({ where: { id: id } });
      if (!Developer) {
        return res.status(401).json({success:false,msg:'Developer not found'});
      }
      await Developer.update(
        {
            name: name,
            email : email ,
            type  : type, 
            contract_period : contract_period,
            rent_commission : rent_commission,
            sale_commission : sale_commission ,
            contact_person  : contact_person,
            contact_phone : contact_phone, 
            status : status, 
             remarks : remarks
        },
        {
          where: {
            id: id,
          },
        }
      );
  
      res.json({success:true,msg:"Developer succesfully updated!"});
      })
  
   
  
    
  
    } catch (err) {
      console.log(err.message);
    }
  };
  
  
  
  exports.deleteDeveloper = async (req, res) => {
    try {
    

        const { id } = req.body;
  
  
  
      const developer = await Developer.findOne({ where: { id: id } });
  
      if (developer) {
        await Developer.destroy({
          where: {
            id: id,
          },
        });
  
        res.json({success:true,msg:"Developer succesfully deleted!"});
      } else {
        return res.status(401).json({ success: false ,error: `Developer not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  