const express = require("express");
const router = express.Router();


const {getExpense,getExpenseCategories,getExpenseCategory,getExpenses,getExpensesByCategory,updateExpense,updateExpenseCategory,deleteExpense,deleteExpenseCategory,createExpense,createExpenseCategory} = require('../controllers/Expense');


router.get("/expense/expenses",getExpenses);
router.post("/expense/:id",getExpense);

router.get("/expense/categories",getExpenseCategories);
router.post("/expense/category/:id",getExpenseCategory);

router.get("/expense/by/category/",getExpensesByCategory);

// Admin Routes - (Protected)

router.post("/expense/add",createExpense);
router.post("/expense/category/add",createExpenseCategory);

router.put("/expense/update",updateExpense);
router.put("/expense/update/category",updateExpenseCategory);


router.delete("/expense/delete",deleteExpense);
router.delete("/expense/category/delete",deleteExpenseCategory);



module.exports = router;