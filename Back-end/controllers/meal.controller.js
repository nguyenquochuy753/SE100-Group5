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
      const allMeals = await mealModel
        .find({})
        .populate({ path: "ma_danh_muc" });
      res.status(200).json(allMeals);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getTop10Meals: async (req, res) => {
    try {
      const top10Meals = await mealModel
        .find({})
        .sort({ so_lan_dat_mon: -1 }) // Sorting in descending order of so_lan_dat_mon
        .limit(10) // Limiting to top 10 results
        .populate({ path: "ma_danh_muc" }); // Populating the category information

      res.status(200).json(top10Meals); // Return the top 10 meals
    } catch (error) {
      res.status(500).json(error); // Handle any errors
    }
  },
  getMeal: async (req, res) => {
    const id = req.params.id;
    try {
      const allMeals = await mealModel
        .find({ _id: id })
        .populate({ path: "ma_danh_muc" });
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
