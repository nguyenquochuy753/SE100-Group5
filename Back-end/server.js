const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
require("dotenv").config();

const menuRoute = require("./routes/menu");
const storageRoute = require("./routes/storage");

app.use(cors());
app.use(express.json());

app.use(menuRoute);
app.use(storageRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});
