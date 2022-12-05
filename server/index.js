const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./database/db");

app.use(cors());
app.use(express.json());

const main = async () => {
const authRoutes = require("./routes/auth");
const locationRoutes = require("./routes/location");
// const expenseRoutes = require("./routes/expense");
// const expenseCategoryRoutes = require("./routes/expenseCategory");
const taskRoutes = require("./routes/task");
const analyticsRoutes = require("./routes/analytics");
const initRoutes = require("./routes/init");
app.use(authRoutes);
app.use(locationRoutes);
// app.use(expenseRoutes);
// app.use(expenseCategoryRoutes);
app.use(taskRoutes);
app.use(initRoutes);
app.use(analyticsRoutes);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

await sequelize.sync({ alter: true });



const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
