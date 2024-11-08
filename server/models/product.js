const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {type: String, required: true}, 
    price: {type: Number},
    createdAt: {type: Date, default: Date.now }, 
    updatedAt: {type: Date, default: Date.now} 
})
module.exports = mongoose.model('Product', Product)