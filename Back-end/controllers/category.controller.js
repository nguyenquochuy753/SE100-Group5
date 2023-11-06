const categoryModel = require("../models/category.model");

const categoryController = {
  addCategory: async (req, res) => {
    const newCategory = new categoryModel(req.body);
    try {
      await newCategory.save();
      res.status(200).json(newCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllCategories: async (req, res) => {
    try {
      const allCategories = await categoryModel.find({});
      res.status(200).json(allCategories);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = categoryController;
