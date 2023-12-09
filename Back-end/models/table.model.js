const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    ten_ban: {
      type: String,
      required: true,
    },
    so_ghe: {
      type: Number,
      required: true,
    },
    trang_thai: {
      type: String,
      default: "Trống",
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

const table = mongoose.model("Table", tableSchema);
module.exports = table;
