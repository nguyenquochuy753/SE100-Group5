const ingredientModel = require("../models/ingredient.model")

const ingredientController = {
    addIngredient: async (req, res) => {
        const ten_nguyen_lieu = req.body.ten_nguyen_lieu;
        const lowercaseTenNguyenLieu = ten_nguyen_lieu.trim().toLowerCase();
        const formattedTenNguyenLieu = lowercaseTenNguyenLieu.charAt(0).toUpperCase() + lowercaseTenNguyenLieu.slice(1);
        const newIngredient = new ingredientModel({
            ten_nguyen_lieu : formattedTenNguyenLieu,
            khoi_luong_ton : req.body.khoi_luong_ton
        });
        try {
            await newIngredient.save();
            res.status(200).json(newIngredient);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllIngredients: async (req, res) => {
        try {
            const allIngredient = await ingredientModel.find({});
            res.status(200).json(allIngredient);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteIngredient: async (req, res) => {
        const id = req.params.id;
        try {
            await ingredientModel.findByIdAndDelete(id);
            res.status(200).json("Deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateIngredient: async (req, res) => {
        const id = req.params.id;
        const ten_nguyen_lieu = req.body.ten_nguyen_lieu;
        const khoi_luong_ton = req.body.khoi_luong_ton;
        const lowercaseTenNguyenLieu = ten_nguyen_lieu.trim().toLowerCase();
        const formattedTenNguyenLieu = lowercaseTenNguyenLieu.charAt(0).toUpperCase() + lowercaseTenNguyenLieu.slice(1);
        try {
            await ingredientModel.findByIdAndUpdate(id,{ten_nguyen_lieu : formattedTenNguyenLieu , khoi_luong_ton : khoi_luong_ton},{new:true});
            res.status(200).json("updated successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
}

module.exports = ingredientController;