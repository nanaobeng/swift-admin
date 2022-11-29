const express = require("express");
const router = express.Router();


const {getSingleTask,getTasks,getTasksByAuthor,getTasksByRecipient,updateTask,deleteTask,createTask} = require('../controllers/task');


router.post("/task/add",createTask);
router.get("/task/:id",getSingleTask);


router.get("/task/tasks",getTasks);
router.get("/task/by/recipient",getTasksByRecipient);
router.get("/task/by/author",getTasksByAuthor);




router.put("/task/update",updateTask);



router.delete("/task/delete",deleteTask);




module.exports = router;