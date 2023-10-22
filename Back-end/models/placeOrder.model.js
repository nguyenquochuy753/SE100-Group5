const mongoose = require("mongoose")

const placeOrderSchema = new mongoose.Schema({
    ma_ban : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Table",
        required: true
    },
    ten_kh : {
        type : String,
        required : true
    },
    sdt_kh: {
        type : String,
        required : true
    },
    so_nguoi: {
        type: Number,
        required : true
    },
    mon_an: [{
        _id : false,
        ma_mon_an: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Meal",
            required: true
        },
        sl: {
            type: Number,
            required: true
        }
    }]
}, { timestamps: true })

const placeOrder = mongoose.model('PlaceOrder', placeOrderSchema)
module.exports = placeOrder