const mongoose = require("mongoose")

const materialSchema = new mongoose.Schema({
    ten_nguyen_lieu: {
        type: String,
        required: true
    },
    khoi_luong_ton: {
        type: Number,
        default : 0
    },
    don_vi: {
        type: String,
        required : true
    },
}, { timestamps: true })

const material = mongoose.model('Material', materialSchema)
module.exports = material