const Product = require("../models/product");

exports.getHomePage = (req, res, next) => {
  Product.fetchAll((allProducts) => {
    res.render("home.ejs", { path: "/", products: allProducts });
  });
};
