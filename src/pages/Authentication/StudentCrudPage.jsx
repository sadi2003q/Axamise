

import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";

// Add a style tag to set the body background to black for this page
const setBodyBg = () => {
  document.body.style.background = "#000";
};
const resetBodyBg = () => {
  document.body.style.background = "";
};

const StudentCrudPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dob: "",
    image: "",
    studentId: ""
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "Students"));
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudents(data);
    } catch {
      setError("Failed to fetch students");
    }
    setLoading(false);
  };

  useEffect(() => {
    setBodyBg();
    fetchStudents();
    return () => resetBodyBg();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // For date fields
  const handleDateChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.gender || !form.dob || !form.studentId) {
      setError("All fields except image are required");
      return;
    }
    try {
      const data = {
        ...form,
        dob: form.dob ? Timestamp.fromDate(new Date(form.dob)) : null,
      };
      if (editId) {
        await updateDoc(doc(db, "Students", editId), data);
      } else {
        await addDoc(collection(db, "Students"), {
          ...data,
          createdAt: serverTimestamp(),
        });
      }
      setForm({ firstName: "", lastName: "", email: "", gender: "", dob: "", image: "", studentId: "" });
      setEditId(null);
      setError("");
      fetchStudents();
    } catch {
      setError("Failed to save student");
    }
  };

  const handleEdit = (student) => {
    setForm({
      firstName: student.firstName || "",
      lastName: student.lastName || "",
      email: student.email || "",
      gender: student.gender || "",
      dob: student.dob && student.dob.seconds ? new Date(student.dob.seconds * 1000).toISOString().slice(0, 10) : "",
      image: student.image || "",
      studentId: student.studentId || ""
    });
    setEditId(student.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await deleteDoc(doc(db, "Students", id));
      fetchStudents();
    } catch {
      setError("Failed to delete student");
    }
  };

  return (
    <div style={{ minHeight: "100vh", width: "100vw", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ padding: 32, maxWidth: 800, width: "100%", background: "#181818", borderRadius: 16, color: "#fff", boxShadow: "0 4px 32px #000a" }}>
        <h1>Students CRUD Operations</h1>
        <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            style={{ background: "#222", color: "#fff", border: "1px solid #444", borderRadius: 4, padding: 6, flex: '1 1 120px' }}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            style={{ background: "#222", color: "#fff", border: "1px solid #444", borderRadius: 4, padding: 6, flex: '1 1 120px' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={{ background: "#222", color: "#fff", border: "1px solid #444", borderRadius: 4, padding: 6, flex: '2 1 200px' }}
          />
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={form.studentId}
            onChange={handleChange}
            style={{ background: "#222", color: "#fff", border: "1px solid #444", borderRadius: 4, padding: 6, flex: '1 1 120px' }}
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            style={{ background: "#222", color: "#fff", border: "1px solid #444", borderRadius: 4, padding: 6, flex: '1 1 120px' }}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={form.dob}
            onChange={handleDateChange}
            style={{ background: "#222", color: "#fff", border: "1px solid #444", borderRadius: 4, padding: 6, flex: '1 1 160px' }}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL (optional)"
            value={form.image}
            onChange={handleChange}
            style={{ background: "#222", color: "#fff", border: "1px solid #444", borderRadius: 4, padding: 6, flex: '2 1 200px' }}
            onClick={e => e.target.select()}
          />
          <button type="submit" style={{ background: "#007bff", color: "#fff", border: "none", borderRadius: 4, padding: "6px 16px", flex: '1 1 120px' }}>{editId ? "Update" : "Add"} Student</button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setForm({ firstName: "", lastName: "", email: "", gender: "", dob: "", image: "", studentId: "" }); }} style={{ background: "#444", color: "#fff", border: "none", borderRadius: 4, padding: "6px 16px", flex: '1 1 120px' }}>
              Cancel
            </button>
          )}
        </form>
        {error && <div style={{ color: "#ff4d4f", marginBottom: 16 }}>{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table border="0" cellPadding="8" style={{ width: "100%", background: "#222", color: "#fff", borderRadius: 8, fontSize: 15 }}>
            <thead>
              <tr style={{ background: "#333" }}>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Student ID</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Created At</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr><td colSpan="9">No students found.</td></tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.email}</td>
                    <td>{student.studentId}</td>
                    <td>{student.gender}</td>
                    <td>{student.dob && student.dob.seconds ? new Date(student.dob.seconds * 1000).toLocaleDateString() : ""}</td>
                    <td>{student.createdAt && student.createdAt.seconds ? new Date(student.createdAt.seconds * 1000).toLocaleString() : ""}</td>
                    <td>{student.image ? <img src={student.image} alt="student" style={{ width: 32, height: 32, borderRadius: "50%" }} /> : ""}</td>
                    <td>
                      <button onClick={() => handleEdit(student)} style={{ background: "#ffc107", color: "#222", border: "none", borderRadius: 4, padding: "4px 12px" }}>Edit</button>
                      <button onClick={() => handleDelete(student.id)} style={{ marginLeft: 8, background: "#ff4d4f", color: "#fff", border: "none", borderRadius: 4, padding: "4px 12px" }}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentCrudPage;
