const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../database/db");
require("dotenv").config();
const jwt = require('jsonwebtoken');
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../utils/authorize");
const User = require("../models/User");


exports.createAdmin = async (req, res) => {
    const { firstname, role , lastname , email, hashed_password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email: `${email}` } });
  
      if (user) {
        return res.status(401).json("User already exist!");
      }
  
      const salt = await bcrypt.genSalt(10);
   

  
      const bcryptPassword = await bcrypt.hash(hashed_password, salt);
      
  
      const newUser = await User.create({
        firstname : firstname,
        lastname : lastname,
        role : role,
        email: email,
        hashed_password: bcryptPassword,
      });
  
      
      return res.json({ success: true  });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ success: false  });
    }
  };

  exports.login = async (req, res) => {
    const { password,email } = req.body;
  
    try {
    
      const user = await User.findOne({ where: { email: email } });
     
     
  
      if (!user) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }

    
  
      const validPassword = await bcrypt.compare(password, user.hashed_password);
  
  
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }
      const token = jwt.sign(
        { user_id: user.id, email: user.email ,role:user.role },
        process.env.jwtSecret
      );
      res.cookie("t", token, { expire: new Date() + 9999 });
  
      const user_id = user.id;
      const role = user.role;
      return res.json({ token, user: { user_id, role } });
    } catch (err) {
      console.error(err.message);
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }
  };
  