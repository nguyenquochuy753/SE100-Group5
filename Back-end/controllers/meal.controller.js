const Meal = require("../models/meal.model");

exports.getMealPage = (req, res, next) => {
  Meal.fetchAll((allMeals) => {
    res.render("meal", {
      path: "/meal",
      meals: allMeals,
    });
  });
};

exports.getAddMeal = (req, res, next) => {
  res.render("add-meal", {
    path: "/add-meal",
  });
};

exports.postAddMeal = (req, res, next) => {
  const id = Math.random().toString();
  const name = req.body.name;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const product = new Meal(id, name, imageURL, price);
  product.save();
  res.redirect("/meal");
};

exports.postDeleteMeal = (req, res, next) => {
  const mealId = req.body.mealId;
  Meal.deleteById(mealId);
  res.redirect("/meal");
};
