const express = require("express");
const router = express.Router();
const formidable = require('formidable');
const pool = require("../database/db");
require("dotenv").config();
const Expense = require("../models/Expense");
const ExpenseCategory = require("../models/ExpenseCategory");


exports.createExpenseCategory = async (req, res) => {

    try {
      let form = new formidable.IncomingForm();
      form.parse(req, async (err, fields) => {
      const { title,type} = fields;
     
      const newRequest = await ExpenseCategory.findOne({ where: { title: `${title}` } });
  
      if (newRequest) {
        return res.status(401).json(
            {
                success: false,
                msg : "Expense Category already exists!"
            }
            
            );
      }
      const newExpenseCategory = await ExpenseCategory.create({
        title: title,
        type: type,
       
      });
  
    
      return res.json({ success: true ,
    msg : "Expense Category Successfully Created"});
      })
      
    
  
      
  
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send( {
        success: false,
        msg : "Error occured during creation."
    });
    }
  };


  exports.getExpenseCategory = async (req, res) => {
    try {
    
      const { id } = req.params;
  
  
  
      const category= await ExpenseCategory.findOne({ where: { id: id } });
  
      if (category) {
        return res.status(200).json({success:true,data:category});
  
   
      } else {
        return res.status(401).json({ success:false,error: `Expense Category not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  


  exports.getExpenseCategories = async (req, res) => {
    try {
    
    
  
  
  
      const categories = await ExpenseCategory.findAll();
  
      if (categories) {
        return res.status(200).json({success:true,data:categories});
  
   
      } else {
        return res.status(401).json({success:false,error:'No Categories Found'});
      }
    } catch (err) {
      console.log(err.message);
    }
  };


  exports.updateExpenseCategory = async (req, res) => {
    try {
    
  
    
  
      let form = new formidable.IncomingForm();
      form.parse(req, async (err, fields) => {
      const { title, type , id} = fields;
      
      const category = await ExpenseCategory.findOne({ where: { id: id } });
      if (!category) {
        return res.status(401).json({success:false,msg:'Category not found'});
      }
      await ExpenseCategory.update(
        {
          title : title,
          type : type
        },
        {
          where: {
            id: id,
          },
        }
      );
  
      res.json({success:true,msg:"Expense Category succesfully updated!"});
      })
  
   
  
    
  
    } catch (err) {
      console.log(err.message);
    }
  };
  
  
  
  exports.deleteExpenseCategory = async (req, res) => {
    try {
    

        const { id } = req.body;
  
  
  
      const category = await ExpenseCategory.findOne({ where: { id: id } });
  
      if (category) {
        await ExpenseCategory.destroy({
          where: {
            id: id,
          },
        });
  
        res.json({success:true,msg:"Expense Category succesfully deleted!"});
      } else {
        return res.status(401).json({ success: false ,error: `Expense Category not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  