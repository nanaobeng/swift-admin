const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./database/db");

app.use(cors());
app.use(express.json());

const main = async () => {

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
