const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    ten_nguyen_lieu: {
        type: String,
        required: true,
        unique: true, 
    },
    khoi_luong_ton: {
        type: Number,
        required: true
    },
    ma_loai_nguyen_lieu : {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Ingredient_Type"
    }
}, { timestamps: true });
ingredientSchema.index({ ten_nguyen_lieu: 1 }, { unique: true, collation: { locale: 'vi', strength: 2 } });

const ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = ingredient;