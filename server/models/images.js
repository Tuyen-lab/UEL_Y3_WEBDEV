const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    filename: {
        type: String,
        required: true
      },
      contentType: {
        type: String,
        required: true
      },
      data: {
        type: Buffer,  // Lưu dữ liệu nhị phân của ảnh
        required: true
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      },
      description: {
        type: String,
        default: ''
      }
    });
module.exports = mongoose.model('Image', Product)