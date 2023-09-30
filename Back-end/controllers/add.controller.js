const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-page", {
    path: "/add-page",
  });
};

exports.postAddProduct = (req, res, next) => {
  const id = Math.random().toString();
  const name = req.body.name;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const product = new Product(id, name, imageURL, price);
  product.save();
  res.redirect("/");
};
