const express = require("express");
const router = express.Router();


const {getAllExpenseCategories,getExpenseCategory,updateExpenseCategory,deleteExpenseCategory,addExpenseCategory} = require('../controllers/ExpenseCategory');




router.get("/expense/find/categories",getAllExpenseCategories);
router.post("/expense/category/:id",getExpenseCategory);



// Admin Routes - (Protected)


router.post("/expense/add/category",addExpenseCategory);


router.put("/expense/update/category",updateExpenseCategory);



router.delete("/expense/category/delete",deleteExpenseCategory);



module.exports = router;