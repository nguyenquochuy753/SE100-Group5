const materialModel = require("../models/material.model")

const materialController = {
    addMaterial: async (req, res) => {
        const newMaterial = new materialModel(req.body)
        try {
            await newMaterial.save();
            res.status(200).json(newMaterial);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllMaterials: async (req, res) => {
        try {
            const allMeals = await mealModel.find({});
            res.status(200).json(allMeals);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteMaterial: async (req, res) => {
        const id = req.params.id;
        try {
            await mealModel.findByIdAndDelete(id);
            res.status(200).json("Deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateMaterial: async (req, res) => {
        const id = req.params.id;
        try {
            await mealModel.findByIdAndUpdate(id, req.body);
            res.status(200).json("updated successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
}

module.exports = materialController