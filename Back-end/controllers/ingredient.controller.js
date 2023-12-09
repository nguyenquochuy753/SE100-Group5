const ingredientModel = require("../models/ingredient.model");

const ingredientController = {
  addIngredient: async (req, res) => {
    const ten_nguyen_lieu = req.body.ten_nguyen_lieu;
    const lowercaseTenNguyenLieu = ten_nguyen_lieu.trim().toLowerCase();
    const formattedTenNguyenLieu =
      lowercaseTenNguyenLieu.charAt(0).toUpperCase() +
      lowercaseTenNguyenLieu.slice(1);
    const newIngredient = new ingredientModel({
      ten_nguyen_lieu: formattedTenNguyenLieu,
      khoi_luong_ton: req.body.khoi_luong_ton,
      ma_loai_nguyen_lieu: req.body.ma_loai_nguyen_lieu,
    });
    try {
      await newIngredient.save();
      res.status(200).json(newIngredient);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllIngredients: async (req, res) => {
    try {
      const allIngredient = await ingredientModel.find({}).populate({
        path: "ma_loai_nguyen_lieu",
        select: "ten_loai_nguyen_lieu",
      });
      res.status(200).json(allIngredient);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getIngredientById: async (req, res) => {
    const id = req.params.id;
    try {
      const ingredient = await ingredientModel.findById(id).populate({
        path: "ma_loai_nguyen_lieu",
        select: "ten_loai_nguyen_lieu",
      });
      res.status(200).json(ingredient);
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
    const ma_loai_nguyen_lieu = req.body.ma_loai_nguyen_lieu;
    const lowercaseTenNguyenLieu = ten_nguyen_lieu.trim().toLowerCase();
    const formattedTenNguyenLieu =
      lowercaseTenNguyenLieu.charAt(0).toUpperCase() +
      lowercaseTenNguyenLieu.slice(1);
    try {
      await ingredientModel.findByIdAndUpdate(
        id,
        {
          ten_nguyen_lieu: formattedTenNguyenLieu,
          khoi_luong_ton: khoi_luong_ton,
          ma_loai_nguyen_lieu: ma_loai_nguyen_lieu,
        },
        { new: true }
      );
      res.status(200).json("updated successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  buyIngredient: async (req, res) => {
    try {
      const updatedIngredients = req.body;
      const bulkOperations = [];

      for (const updatedIngredient of updatedIngredients) {
        const { _id, khoi_luong_ton } = updatedIngredient;
        const updateOperation = {
          updateOne: {
            filter: { _id },
            update: { $inc: { khoi_luong_ton } },
          },
        };

        bulkOperations.push(updateOperation);
      }
      await ingredientModel.bulkWrite(bulkOperations);

      res.status(200).json({ message: "Cập nhật thành công" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Lỗi server" });
    }
  },
};

module.exports = ingredientController;
