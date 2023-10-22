const mealModel = require("../models/meal.model");

const mealController = {
  addMeal: async (req, res) => {
    const newMeal = new mealModel(req.body);
    if (req.file) {
      newMeal.hinh_anh_mon_an = req.file.path;
    }
    try {
      await newMeal.save();
      res.status(200).json(newMeal);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllMeals: async (req, res) => {
    try {
      const allMeals = await mealModel.find({});
      res.status(200).json(allMeals);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getMeal: async (req, res) => {
    const id = req.params.id;
    try {
      const allMeals = await mealModel.find({ _id: id });
      res.status(200).json(allMeals);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteMeal: async (req, res) => {
    const id = req.params.id;
    try {
      await mealModel.findByIdAndDelete(id);
      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateMeal: async (req, res) => {
    const id = req.params.id;
    try {
      await mealModel.findByIdAndUpdate(id, req.body);
      res.status(200).json("updated successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = mealController;
