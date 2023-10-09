const mongoose = require("mongoose")

const tableSchema = new mongoose.Schema({
    ten_ban : {
        type : String ,
        required : true
    }, 
    so_ghe : {
        type : Number ,
        required : true
    },
    trang_thai : {
        type : String ,
        default : "Trống"
    }
},{timestamps : true})

const table = mongoose.model('Table',tableSchema)
module.exports = table