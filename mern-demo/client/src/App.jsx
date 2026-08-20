import { useEffect, useState } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: ''
  });

  // Lấy danh sách sinh viên từ Backend
  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Lỗi kết nối:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Xử lý thay đổi dữ liệu trong ô input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Thêm sinh viên mới (Gọi POST API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentId || !formData.name || !formData.email) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setFormData({ studentId: '', name: '', email: '' });
        fetchStudents(); // Cập nhật lại danh sách sau khi thêm
      } else {
        const errData = await res.json();
        alert('Lỗi: ' + errData.message);
      }
    } catch (err) {
      console.error("Lỗi thêm sinh viên:", err);
    }
  };

  // CÂU 61: Hàm xử lý cập nhật tên sinh viên
  const handleUpdate = async (id) => {
    const newName = prompt("Nhập tên mới cho sinh viên:");
    if (!newName) return; // Bỏ qua nếu người dùng không nhập gì

    try {
      const res = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }) // Gửi tên mới xuống backend
      });

      if (res.ok) {
        alert("Cập nhật thành công!");
        fetchStudents(); // Gọi lại hàm lấy danh sách để làm mới bảng
      } else {
        alert("Cập nhật thất bại, vui lòng kiểm tra lại!");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API cập nhật:", error);
      alert("Có lỗi xảy ra khi kết nối đến server!");
    }
  };

  // CÂU 62: Hàm xử lý xóa sinh viên
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sinh viên này không?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert("Xóa thành công!");
        fetchStudents(); // CÂU 63: Gọi lại hàm lấy danh sách để tự động làm mới bảng
      } else {
        alert("Xóa thất bại, vui lòng kiểm tra lại!");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API xóa:", error);
      alert("Có lỗi xảy ra khi kết nối đến server!");
    }
  };

  return (
    <div style={{ maxWidth: '850px', margin: '30px auto', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h2>Quản Lý Sinh Viên</h2>

      {/* Form thêm sinh viên */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
        <input
          type="text"
          name="studentId"
          placeholder="Mã sinh viên (MSSV)"
          value={formData.studentId}
          onChange={handleChange}
          style={{ padding: '6px 10px', width: '180px', border: '1px solid #ccc', borderRadius: '2px' }}
        />
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: '6px 10px', width: '180px', border: '1px solid #ccc', borderRadius: '2px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ padding: '6px 10px', width: '180px', border: '1px solid #ccc', borderRadius: '2px' }}
        />
        <button
          type="submit"
          style={{ padding: '6px 12px', cursor: 'pointer', border: '1px solid #ccc', backgroundColor: '#eee', borderRadius: '2px' }}
        >
          Thêm Sinh Viên
        </button>
      </form>

      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />

      <h3>Danh Sách Sinh Viên</h3>

      {/* Bảng danh sách sinh viên */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', color: '#333' }}>
            <th style={{ border: '1px solid #ddd', padding: '10px', width: '20%' }}>MSSV</th>
            <th style={{ border: '1px solid #ddd', padding: '10px', width: '35%' }}>Họ và Tên</th>
            <th style={{ border: '1px solid #ddd', padding: '10px', width: '25%' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '10px', width: '20%' }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ border: '1px solid #ddd', padding: '12px' }}>Chưa có dữ liệu sinh viên...</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id}>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{student.studentId || 'N/A'}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{student.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{student.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                  
                  {/* Nút Cập nhật */}
                  <button 
                    onClick={() => handleUpdate(student._id)}
                    style={{ padding: '4px 8px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '3px', marginRight: '5px' }}
                  >
                    Cập nhật
                  </button>

                  {/* Nút Xóa */}
                  <button 
                    onClick={() => handleDelete(student._id)}
                    style={{ padding: '4px 8px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '3px' }}
                  >
                    Xóa
                  </button>

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;