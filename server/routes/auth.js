const express = require("express");
const router = express.Router();

const {createAccount} = require('../controllers/auth');
//authorizeentication

router.post("/auth/create/account",createAccount);



module.exports = router;