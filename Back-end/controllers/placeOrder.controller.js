const placeOrderModel = require("../models/placeOrder.model")

const placeOrderController = {
    addPlaceOrder: async (req, res) => {
        try {
            const { ma_ban, ten_kh, sdt_kh, so_nguoi, mon_an } = req.body;
            const monAnArray = [];

            for (const item of mon_an) {
                const { ma_mon_an, sl } = item;
                const monAn = {
                    ma_mon_an,
                    sl,
                };
                monAnArray.push(monAn);
            }

            const newPlaceOrder = new placeOrderModel({
                ma_ban,
                ten_kh,
                sdt_kh,
                so_nguoi,
                mon_an: monAnArray,
            });

            const savedPlaceOrder = await newPlaceOrder.save();
            res.status(201).json(savedPlaceOrder);
        } catch (error) {
            res.status(400).json({ error: 'Lỗi khi thêm placeOrder: ' + error.message });
        }
    },
    getAllPlaceOrder : async(req,res)=>{
        try {
            const allPlaceOrders = await placeOrderModel.find({}).populate({
                path: 'mon_an.ma_mon_an',
                select: '_id ten_mon_an gia hinh_anh_mon_an'
            });
            res.status(200).json(allPlaceOrders);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

module.exports = placeOrderController

