const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose")

const homeRoute = require("./routes/home.route");
const mealRoute = require("./routes/meal.route");
const tableRoute = require("./routes/table.route");
const ingredientRoute = require("./routes/ingredient.route");
const placeOrderRoute = require("./routes/placeOrder.route")

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))

mongoose.connect(process.env.MONGO_CONNECT_URL).then(()=>{
  console.log('Connected MongoDB successfully');
})

app.use(homeRoute);
app.use('/v1/meal',mealRoute);
app.use('/v1/table',tableRoute);
app.use('/v1/ingredient', ingredientRoute);
app.use('/v1/placeOrder',placeOrderRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});
