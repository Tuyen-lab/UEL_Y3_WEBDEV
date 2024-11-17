const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
    { ma: { type: String, required: true }, // Mã định danh
    toado: { type: [Number], required: true }, // Tọa độ vị trí [latitude, longitude]
    chuho: { type: String, required: true }, // Chủ hộ
    title: { type: String }, // Tiêu đề
    style: { type: [String] }, // Phong cách
    ten: { type: String }, // Tên homestay
    country: { type: String }, // Quốc gia
    provin: { type: String }, // Tỉnh/Thành phố
    city: { type: String }, // Thành phố/Huyện
    ngaynhan: { type: String }, // Ngày nhận phòng
    ngaytra: { type: String}, // Ngày trả phòng
    gia: { type: String }, // Giá thuê
    thumnail: { type: String }, // Hình ảnh đại diện
    anh: { type: [String]}, // Danh sách hình ảnh
    phongngu: { type: Number }, // Số phòng ngủ
    giuong: { type: Number }, // Số giường
    phongtam: { type: Number}, // Số phòng tắm
    tiennghi: { type: [String]}, // Danh sách tiện nghi
    mota: { type: String }, // Mô tả chi tiết
    }
)
module.exports = mongoose.model('Product', Product)