const express = require("express");
const router = express.Router();


const authorize = require("../utils/authorize");

const {createAdmin,login} = require('../controllers/auth');


router.post("/auth/create/account",createAdmin);
router.post("/auth/login",login);



module.exports = router;