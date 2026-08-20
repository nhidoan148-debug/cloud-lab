const mongoose = require('mongoose');

// Thêm age vào Schema để khớp với dữ liệu bạn đã insert trên Atlas
const studentSchema = new mongoose.Schema({
    studentId: String,
    name: String,
    email: String,
    age: Number
}, { strict: false }); // strict: false giúp Mongoose đọc mọi trường dữ liệu có sẵn trong DB

module.exports = mongoose.model('Student', studentSchema, 'students');