const mongoose = require("mongoose");

const reservingSchema = new mongoose.Schema(
    {
        ten_khach_hang: {
            type: String,
            required: true,
        },
        sdt: {
            type: String,
            required: true,
        },
        ma_khach_hang: {
            type: mongoose.SchemaTypes.ObjectId,
            ref:"users"
        },
        ngay: {
            type: String,
            required: true
        },
        gio: {
            type: String,
            required: true
        },
        ma_ban: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Table'
        },
        trang_thai: {
            type: String,
            default: "Đã đặt"
        },
        mon_an: [
            {
                _id: false,
                ma_mon_an: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: "Meal",
                    required: true,
                },
                sl: {
                    type: Number,
                    required: true,
                },
                trang_thai: {
                    type: String,
                    default: "Chờ chế biến", // chờ chế biến, đã chế biến , hoàn thành
                },
            },
        ],
    },
    { timestamps: true }
);

const reserving = mongoose.model("Reserving", reservingSchema);
module.exports = reserving;
