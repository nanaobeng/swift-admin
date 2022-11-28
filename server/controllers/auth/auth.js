const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../db");
require("dotenv").config();
const jwt = require('jsonwebtoken');
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../utils/authorize");
const User = require("../models/User");


exports.createAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email: `${email}` } });
  
      if (user) {
        return res.status(401).json("User already exist!");
      }
  
      const salt = await bcrypt.genSalt(10);
  
      const bcryptPassword = await bcrypt.hash(password, salt);
  
      const newUser = await User.create({
        email: email,
        password: bcryptPassword,
      });
  
      console.log("success");
      return res.json({ success: newUser  });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };

// exports.login =  async (req,res) => {

//     const { email, password } = req.body;
  
//     // query = `SELECT * FROM administrators WHERE email ='${email}'`
//     query = `SELECT * FROM administrators WHERE email = '${email}'`


//     try {
//       const user = await pool.query(query)
     
 
//       if (user.rows.length === 0) {
//         return res.status(401).json({error:"Invalid Credentials"});
//       }
     


  
//       const validPassword = await bcrypt.compare(
//         password,
//         user.rows[0].passcode
//       );
//       console.log(validPassword)
     
//       if (!validPassword) {
       
//         return res.status(401).json({error:"Invalid Credentials"});
//       }
//       const token = jwt.sign({user_id: user.rows[0].user_id , email:user.rows[0].email}, process.env.jwtSecret)
//       res.cookie('t',token,{expire: new Date() + 9999})

      
//       const user_id  = user.rows[0].user_id
//       const email  = user.rows[0].email
//       return res.json ({ token, user: {user_id ,email}})
//     } catch (err) {
//       console.error(err.message);
//       return res.status(401).json({
//         error: "Invalid Credentials"
//     });
//     }



// };


// exports.deleteAccount =  async (req,res) => {
//   try {
//     const { id } = req.params;
//     const select = await pool.query("SELECT * FROM administrators WHERE user_id = $1", [
//       id
//     ])

//     if (select.rows.length === 0) {
//       return res.status(401).json(`Account does not exist!`);
//     }
//     const deleteAdmin = await pool.query("DELETE FROM administrators WHERE user_id = $1", [
//       id
//     ]);
//     res.json("Account was deleted!");
//   } catch (err) {
//     console.log(err.message);
//   }
// };