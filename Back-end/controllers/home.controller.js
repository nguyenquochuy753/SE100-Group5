const Product = require("../models/meal.model");

exports.getHomePage = (req, res, next) => {
  Product.fetchAll((allProducts) => {
    res.render("home.ejs", { path: "/" });
  });
};
