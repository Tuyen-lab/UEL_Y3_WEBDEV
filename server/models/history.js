const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    manha: {type: String},
    gia: {type: String},
    host: {type: String},
    cus:{type:String},
    ngaythue: {type: String},
    ngaytra:  {type: String}, 
    detail: {type: Schema.Types.Mixed}
})
module.exports = mongoose.model('History', Product)