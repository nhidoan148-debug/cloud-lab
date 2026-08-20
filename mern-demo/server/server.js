const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const Student = require('./Student');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Ket noi MongoDB Atlas va chi khoi dong Server khi ket noi thanh cong
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Ket noi MongoDB Atlas thanh cong!");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error("Loi ket noi Database:", err));

// Câu 36: GET API - Lay danh sach sinh vien
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        console.error("Lỗi chi tiết GET /api/students:", err);
        res.status(500).json({ message: err.message });
    }
});

// Câu 37: POST API - Them sinh vien moi
app.post('/api/students', async (req, res) => {
    const { studentId, name, email } = req.body;
    try {
        const newStudent = await Student.create({ studentId, name, email });
        res.status(201).json(newStudent);
    } catch (err) {
        console.error("Lỗi chi tiết POST /api/students:", err);
        res.status(400).json({ message: err.message });
    }
});

// Câu 38: PUT API - Cap nhat thong tin sinh vien
app.put('/api/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStudent);
    } catch (err) {
        console.error("Lỗi chi tiết PUT /api/students/:id:", err);
        res.status(400).json({ message: err.message });
    }
});

// Câu 39: DELETE API - Xoa sinh vien
app.delete('/api/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Da xoa sinh vien thanh cong" });
    } catch (err) {
        console.error("Lỗi chi tiết DELETE /api/students/:id:", err);
        res.status(500).json({ message: err.message });
    }
});