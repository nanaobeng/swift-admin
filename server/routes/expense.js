const express = require("express");
const router = express.Router();


const {getSingleExpense,getExpenses,getExpensesByCategoryType,getExpensesByCategoryItem,updateExpense,deleteExpense,createExpense} = require('../controllers/expense');


router.get("/expense/expenses",getExpenses);
router.get("/expense/:id",getSingleExpense);


router.get("/expense/by/category/type",getExpensesByCategoryType);
router.get("/expense/by/category/item",getExpensesByCategoryItem);

// Admin Routes - (Protected)

router.post("/expense/add",createExpense);


router.put("/expense/update",updateExpense);



router.delete("/expense/delete",deleteExpense);




module.exports = router;