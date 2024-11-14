const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    username: {type: String},
    pass: {type: String},
    phone: {type: String},
    email: {type: String},
})
module.exports = mongoose.model('User', Product)