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
  

//   Expenses


exports.createExpense = async (req, res) => {

    try {
      let form = new formidable.IncomingForm();
      form.parse(req, async (err, fields) => {
      const { title, category , cost , description } = fields;

      const currentYear =  (new Date()).getFullYear()
      const currentMonth = ((new Date()).getMonth() + 1 )
     
      const newRequest = await Expense.findOne({ where: { title: `${title}` , month : `${currentMonth}` , year : `${currentYear}`} });
  
      if (newRequest) {
        return res.status(401).json(
            {
                success: false,
                msg : "Expense already exists!"
            }
            
            );
      }
      const newExpense = await Expense.create({
        title: title,
        category: category,
        cost : cost ,
        description : description,
        month : currentMonth ,
        year : currentYear

       
      });
  
    
      return res.json({ success: true ,
    msg : "Expense Successfully Created"});
      })
      
    
  
      
  
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send( {
        success: false,
        msg : "Error occured during creation."
    });
    }
  };


  exports.getExpense = async (req, res) => {
    try {
    
      const { id } = req.params;
  
  
  
      const expense = await Expense.findOne({ where: { id: id } });
  
      if (expense) {
        return res.status(200).json({success:true,data:expense});
  
   
      } else {
        return res.status(401).json({ success:false,error: `Expense not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  


  exports.getExpenses = async (req, res) => {
    try {
    
    
  
  
  
      const expenses = await Expense.findAll();
  
      if (expenses) {
        return res.status(200).json({success:true,data:expenses});
  
   
      } else {
        return res.status(401).json({success:false,error:'No Expenses Found'});
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  exports.getExpensesByCategory = async (req, res) => {
    try {
    
      const { category_id } = req.params;
  
  
  
      const expenses = await Expense.findAll({ where: { category: category_id } });
  
      if (expenses) {
        return res.status(200).json({success:true,data:expenses});
  
   
      } else {
        return res.status(401).json({ success:false,error: `Expenses not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  


  exports.updateExpense = async (req, res) => {
    try {
    
  
    
  
      let form = new formidable.IncomingForm();
      form.parse(req, async (err, fields) => {
      const { title, category , cost , description ,id } = fields;
      
      const expense = await Expense.findOne({ where: { id: id } });
      if (!expense) {
        return res.status(401).json({success:false,msg:'Expense not found'});
      }
      await Expense.update(
        {
            title: title,
            category: category,
            cost : cost ,
            description : description,
        },
        {
          where: {
            id: id,
          },
        }
      );
  
      res.json({success:true,msg:"Expense succesfully updated!"});
      })
  
   
  
    
  
    } catch (err) {
      console.log(err.message);
    }
  };
  
  
  
  exports.deleteExpense = async (req, res) => {
    try {
    

        const { id } = req.body;
  
  
  
      const expense = await Expense.findOne({ where: { id: id } });
  
      if (expense) {
        await Expense.destroy({
          where: {
            id: id,
          },
        });
  
        res.json({success:true,msg:"Expense succesfully deleted!"});
      } else {
        return res.status(401).json({ success: false ,error: `Expense  not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  