const express = require("express");
const router = express.Router();


const authorize = require("../utils/authorize");

const {createAdmin} = require('../controllers/auth/auth');


router.post("/auth/create/account",createAdmin);


module.exports = router;