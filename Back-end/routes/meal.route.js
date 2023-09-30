const express = require("express");
const router = express.Router();
const mealController = require("../controllers/meal.controller");

router.get("/meal", mealController.getMealPage);

router.get("/add-meal", mealController.getAddMeal);

router.post("/add-meal", mealController.postAddMeal);

router.post("/delete-meal", mealController.postDeleteMeal);

module.exports = router;
