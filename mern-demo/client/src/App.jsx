import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId: '', name: '', email: '' });

  const API_URL = 'http://localhost:5000/api/students';

  // Câu 47: GET Danh sách
  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Lỗi lấy dữ liệu:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Câu 48: Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Câu 49: POST Thêm sinh viên
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ studentId: '', name: '', email: '' }); // Reset form
      fetchStudents(); // Cập nhật lại danh sách ngay lập tức
    } catch (err) {
      console.error('Lỗi khi thêm sinh viên:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Quản Lý Sinh Viên</h2>

      {/* Form Câu 48 & 49 */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="studentId" placeholder="MSSV" value={form.studentId} onChange={handleChange} required /> {' '}
        <input name="name" placeholder="Họ tên" value={form.name} onChange={handleChange} required /> {' '}
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required /> {' '}
        <button type="submit">Thêm Sinh Viên</button>
      </form>

      {/* Bảng Câu 47 */}
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ và Tên</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((st) => (
            <tr key={st._id}>
              <td>{st.studentId}</td>
              <td>{st.name}</td>
              <td>{st.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;