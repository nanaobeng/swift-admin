const express = require("express");
const router = express.Router();
const formidable = require('formidable');
const pool = require("../database/db");
require("dotenv").config();
const Expense = require("../models/Expense");
const ExpenseCategory = require("../models/ExpenseCategory");





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


  exports.getSingleExpense = async (req, res) => {
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
    
    
  
      let category_map = {}
      const expense_types = await ExpenseCategory.findAll()
      expense_types.map((i) => {
        category_map[i.id] =  [i.title,i.type]
      })

      const expenses = await Expense.findAll();
      let result = []
  
      if (expenses) {
        expenses.map( async (data) =>{
            result.push({
                id : data.id,
                expense_category : category_map[data.category][1],
                expense_type : category_map[data.category][0],
                cost : data.cost,
                description : data.description,
                title : data.title,
                month : data.month,
                year: data.year

            })


        })
     
        return res.status(200).json({success:true,data:result});
  
   
      } else {
        return res.status(401).json({success:false,error:'No Expenses Found'});
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  exports.getExpensesByCategoryType = async (req, res) => {
    try {
    
      const { type } = req.body;
  
  
  
      const expenses = await Expense.findAll({ where: { type: type } });
  
      if (expenses) {
        return res.status(200).json({success:true,data:expenses});
  
   
      } else {
        return res.status(401).json({ success:false,error: `Expenses not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  exports.getExpensesByCategoryTitle = async (req, res) => {
    try {
    
      const { title } = req.body;
  
  
  
      const expenses = await Expense.findAll({ where: { title: title } });
  
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
  