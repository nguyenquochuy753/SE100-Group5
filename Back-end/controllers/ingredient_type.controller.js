const ingredient_typeModel = require("../models/ingredient_type.model");

const ingredient_typeController = {
    addIngredient_type: async (req, res) => {
        const ten_loai_nguyen_lieu = req.body.ten_loai_nguyen_lieu;
        const lowercaseTenLoaiNguyenLieu = ten_loai_nguyen_lieu.trim().toLowerCase();
        const formattedTenLoaiNguyenLieu = lowercaseTenLoaiNguyenLieu.charAt(0).toUpperCase() + lowercaseTenLoaiNguyenLieu.slice(1);
        const newIngredientType = new ingredient_typeModel({
            ten_loai_nguyen_lieu: formattedTenLoaiNguyenLieu,
        });
        try {
            await newIngredientType.save();
            res.status(200).json(newIngredientType);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllIngredientType: async (req, res) => {
        try {
            const allIngredientType = await ingredient_typeModel.find({});
            res.status(200).json(allIngredientType);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteIngredientType: async (req, res) => {
        const id = req.params.id;
        try {
            await ingredient_typeModel.findByIdAndDelete(id);
            res.status(200).json("Deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateIngredientType: async (req, res) => {
        const id = req.params.id;
        const ten_loai_nguyen_lieu = req.body.ten_loai_nguyen_lieu;
        const lowercaseTenLoaiNguyenLieu = ten_loai_nguyen_lieu.trim().toLowerCase();
        const formattedTenLoaiNguyenLieu = lowercaseTenLoaiNguyenLieu.charAt(0).toUpperCase() + lowercaseTenLoaiNguyenLieu.slice(1);
        try {
            await ingredient_typeModel.findByIdAndUpdate(id, { ten_loai_nguyen_lieu: formattedTenLoaiNguyenLieu }, { new: true });
            res.status(200).json("updated successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = ingredient_typeController;