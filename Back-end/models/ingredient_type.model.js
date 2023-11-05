const mongoose = require("mongoose");

const ingredient_typeSchema = new mongoose.Schema({
    ten_loai_nguyen_lieu: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

ingredient_typeSchema.index({ ten_loai_nguyen_lieu: 1 }, { unique: true, collation: { locale: 'vi', strength: 2 } });

const ingredient_type = mongoose.model('Ingredient_Type', ingredient_typeSchema);
module.exports = ingredient_type;