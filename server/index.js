const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();


app.use(cors());
app.use(express.json());

const main = async () => {



const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
