const express = require("express");
const router = express.Router();


const {createValues} = require('../controllers/serUpScript');


router.post("/test/init",createValues);

module.exports = router;