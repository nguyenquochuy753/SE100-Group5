const reservingModel = require("../models/reserving.model");
const mealModel = require("../models/meal.model");

const reservingController = {
    reserving: async (req, res) => {
        const id = req.params.id;
        try {
            const newReserving = new reservingModel(req.body);
            await newReserving.save();

            const { mon_an } = req.body;
            for (const item of mon_an) {
                const mealId = item.ma_mon_an;
                await mealModel.findByIdAndUpdate(mealId, { $inc: { so_lan_dat_mon: 1 } });
            }

            res.status(200).json(newReserving);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllRervings: async(req,res)=>{
        try {
            const allReservings = await reservingModel.find();
            res.status(200).json(allReservings);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getRervingById: async (req, res) => {
        try {
            const {_id} = req.params;
            const reserving = await reservingModel.findById(_id);
            res.status(200).json(reserving);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateReserving: async (req, res) => {
        const id = req.params._id;
        try {
            await reservingModel.findByIdAndUpdate(id, req.body, {new : true});
            res.status(200).json("updated successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
}

module.exports = reservingController;