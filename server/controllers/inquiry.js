const express = require("express");
const router = express.Router();
const formidable = require('formidable');
const pool = require("../database/db");
require("dotenv").config();
const Inquiry = require("../models/Inquiry");


exports.createInquiry = async (req, res) => {

    try {
      let form = new formidable.IncomingForm();
      form.parse(req, async (err, fields) => {
      const { client , phone , email , purchase_type , duration_of_stay , location , property_type , price , lead_agent , properties_visited , rooms , commencement_date , closure_date , contract_signed , priority , remarks , status } = fields;
     
      const newRequest = await Inquiry.findOne({ where: { client: `${client}` } });
  
      if (newRequest) {
        return res.status(401).json(
            {
                success: false,
                msg : "Inquiry already exists!"
            }
            
            );
      }
      const newInquiry = await Inquiry.create({
        client  : client, 
        phone : phone, 
        email : email , 
        purchase_type : purchase_type ,
         duration_of_stay : duration_of_stay, 
         location : location ,
          property_type  : property_type,
           price : price , 
           lead_agent : lead_agent ,
            properties_visited  : properties_visited, 
            rooms : rooms, 
            commencement_date  : commencement_date, 
            closure_date : closure_date, 
            contract_signed : contract_signed ,
             priority : priority, 
             remarks : remarks,
              status : status
       
      });
  
      console.log("success");
      return res.json({ success: true ,
    msg : "Inquiry Successfully Created"});
      })
      
    
  
      
  
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send( {
        success: false,
        msg : "Error occured during creation."
    });
    }
  };


  exports.getInquiry = async (req, res) => {
    try {
    
      const { id } = req.params;
  
  
  
      const inquiry = await Inquiry.findOne({ where: { id: id } });
  
      if (inquiry) {
        return res.status(200).json({success:true,data:inquiry});
  
   
      } else {
        return res.status(401).json({ success:false,error: `Inquiry not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  


  exports.getInquiries = async (req, res) => {
    try {
    
    
  
  
  
      const inquiries = await Inquiry.findAll();
  
      if (inquiries) {
        return res.status(200).json({success:true,data:inquiries});
  
   
      } else {
        return res.status(401).json({success:false,error:'No Inquiries Found'});
      }
    } catch (err) {
      console.log(err.message);
    }
  };


  exports.updateInquiry = async (req, res) => {
    try {
    
  
    
  
      let form = new formidable.IncomingForm();
      form.parse(req, async (err, fields) => {
      const { client , phone , email , purchase_type , duration_of_stay , location , property_type , price , lead_agent , properties_visited , rooms , commencement_date , closure_date , contract_signed , priority , remarks , status,id} = fields;
      
      const inquiry = await Inquiry.findOne({ where: { id: id } });
      if (!inquiry) {
        return res.status(401).json({success:false,msg:'Inquiry not found'});
      }
      await Inquiry.update(
        {
            client  : client, 
        phone : phone, 
        email : email , 
        purchase_type : purchase_type ,
         duration_of_stay : duration_of_stay, 
         location : location ,
          property_type  : property_type,
           price : price , 
           lead_agent : lead_agent ,
            properties_visited  : properties_visited, 
            rooms : rooms, 
            commencement_date  : commencement_date, 
            closure_date : closure_date, 
            contract_signed : contract_signed ,
             priority : priority, 
             remarks : remarks,
              status : status
        },
        {
          where: {
            id: id,
          },
        }
      );
  
      res.json({success:true,msg:"Inquiry succesfully updated!"});
      })
  
   
  
    
  
    } catch (err) {
      console.log(err.message);
    }
  };
  
  
  
  exports.deleteInquiry = async (req, res) => {
    try {
    

        const { id } = req.body;
  
  
  
      const inquiry = await Inquiry.findOne({ where: { id: id } });
  
      if (inquiry) {
        await Inquiry.destroy({
          where: {
            id: id,
          },
        });
  
        res.json({success:true,msg:"Inquiry succesfully deleted!"});
      } else {
        return res.status(401).json({ success: false ,error: `Inquiry not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  