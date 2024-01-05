const reservingModel = require("../models/reserving.model");

const reservingController = {
  reserving: async (req, res) => {
    const id = req.params.id;
    try {
      const newReserving = new reservingModel(req.body);
      await newReserving.save();
      res.status(200).json(newReserving);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllRervings: async (req, res) => {
    try {
      const allReservings = await reservingModel
        .find({
          trang_thai: "Đã đặt",
        })
        .populate({
          path: "mon_an.ma_mon_an",
        });

      res.status(200).json(allReservings);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getRervingById: async (req, res) => {
    try {
      const { _id } = req.params;
      const reserving = await reservingModel.findById(_id);
      res.status(200).json(reserving);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateReserving: async (req, res) => {
    const id = req.params._id;
    try {
      await reservingModel.findByIdAndUpdate(id, req.body);
      res.status(200).json("updated successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = reservingController;
