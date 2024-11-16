const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    cus: {type: String},
    manha: {type: String}
})
module.exports = mongoose.model('Wish', Product)