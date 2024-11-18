const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    manha: {type: String},
    host: {type: String},
    cus:{type:String},
    sao:{type:Number},
    comment:{type:String},
    
})
module.exports = mongoose.model('Comment', Product)