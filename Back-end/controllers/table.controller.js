const tableModel = require("../models/table.model");

const tableController = {
  addTable: async (req, res) => {
    const newTable = new tableModel(req.body);
    try {
      await newTable.save();
      res.status(200).json(newTable);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllTables: async (req, res) => {
    try {
      const allTables = await tableModel.find({}).populate("mon_an.ma_mon_an");
      res.status(200).json(allTables);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getTableById: async (req, res) => {
    const id = req.params.id;
    try {
      const table = await tableModel
        .find({ _id: id })
        .populate("mon_an.ma_mon_an");
      res.status(200).json(table);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteTable: async (req, res) => {
    const id = req.params.id;
    try {
      await tableModel.findByIdAndDelete(id);
      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateTable: async (req, res) => {
    const id = req.params.id;
    try {
      await tableModel.findByIdAndUpdate(id, req.body);
      res.status(200).json("updated successfully");
    } catch (error) {''
      res.status(500).json(error);
    }
  },
  orderMeal: async (req, res) => {
    const id = req.params.id;
    try {
      await tableModel.findByIdAndUpdate(id, {
        trang_thai: req.body.trang_thai,
        mon_an: req.body.mon_an,
      });
      res.status(200).json("order successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getTableNotAvailable: async(req,res)=>{
    try {
      const tables = await tableModel.find({ trang_thai: "Đang ăn" }).sort({ updatedAt: 1 });
      res.status(200).json(tables);
    } catch (error) {
      res.status(200).json(error);
    }
  }
};

module.exports = tableController;
