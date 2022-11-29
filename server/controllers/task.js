const express = require("express");
const router = express.Router();
const formidable = require('formidable');
const pool = require("../database/db");
require("dotenv").config();
const Task = require("../models/Task");






exports.createTask = async (req, res) => {
  

    try {
      let form = new formidable.IncomingForm();
      form.parse(req, async (err, fields) => {
      const { title, author , recipient , description , proposed_deadline } = fields;


     
      const newRequest = await Task.findOne({ where: { title: `${title}`} });
  
      if (newRequest) {
        return res.status(401).json(
            {
                success: false,
                msg : "Task already exists!"
            }
            
            );
      }
      const newTask = await Task.create({
        title: title,
        author: author,
        recipient : recipient ,
        description : description,
        proposed_deadline : proposed_deadline
        

       
      });
  
    
      return res.json({ success: true ,
    msg : "Task Successfully Created"});
      })
      
    
  
      
  
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send( {
        success: false,
        msg : "Error occured during creation."
    });
    }
  };


  exports.getSingleTask = async (req, res) => {
    try {
      
    
      const { id } = req.params;
  
  
  
      const task = await Task.findOne({ where: { id: id } });
  
      if (task) {
        return res.status(200).json({success:true,data:task});
  
   
      } else {
        return res.status(401).json({ success:false,error: `Task not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  


  exports.getTasks = async (req, res) => {
    try {
    
    
  
     
  
      const tasks = await Task.findAll();
    
  
      if (tasks) {
    
     
        return res.status(200).json({success:true,data:tasks});
  
   
      } else {
        return res.status(401).json({success:false,error:'No Task Found'});
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  exports.getTasksByRecipient = async (req, res) => {
    try {
    
      const { recipient } = req.body;
  
  
  
      const tasks = await Task.findAll({ where: { recipient: recipient } });
  
      if (tasks) {
        return res.status(200).json({success:true,data:tasks});
  
   
      } else {
        return res.status(401).json({ success:false,error: `Tasks not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  exports.getTasksByAuthor = async (req, res) => {
    try {
    
      const { author } = req.body;
  
  
  
      const tasks = await Task.findAll({ where: { author: author } });
  
      if (tasks) {
        return res.status(200).json({success:true,data:tasks});
  
   
      } else {
        return res.status(401).json({ success:false,error: `Tasks not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

 


  exports.updateTask = async (req, res) => {
    try {
    
  
    
  
      let form = new formidable.IncomingForm();
      form.parse(req, async (err, fields) => {
     const { title, author , recipient , description , proposed_deadline ,id } = fields;
      
      const task = await Task.findOne({ where: { id: id } });
      if (!task) {
        return res.status(401).json({success:false,msg:'Task not found'});
      }
      await Task.update(
        {
            title: title,
        author: author,
        recipient : recipient ,
        description : description,
        proposed_deadline : proposed_deadline
        

        },
        {
          where: {
            id: id,
          },
        }
      );
  
      res.json({success:true,msg:"Task succesfully updated!"});
      })
  
   
  
    
  
    } catch (err) {
      console.log(err.message);
    }
  };
  
  
  
  exports.deleteTask = async (req, res) => {
    try {
    

        const { id } = req.body;
  
  
  
      const task = await Task.findOne({ where: { id: id } });
  
      if (task) {
        await Task.destroy({
          where: {
            id: id,
          },
        });
  
        res.json({success:true,msg:"Task succesfully deleted!"});
      } else {
        return res.status(401).json({ success: false ,error: `Task  not Found!` });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  