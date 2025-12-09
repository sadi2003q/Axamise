

import React, { useEffect, useState } from "react";

import "./StudentCrudPage.css";
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
    <div className="student-crud-bg">
      <div className="student-crud-card">
        <h1 className="student-crud-title">Students CRUD Operations</h1>
        <form onSubmit={handleSubmit} className="student-crud-form">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="student-crud-input"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="student-crud-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="student-crud-input student-crud-input-wide"
          />
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={form.studentId}
            onChange={handleChange}
            className="student-crud-input"
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="student-crud-input"
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
            className="student-crud-input student-crud-input-date"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL (optional)"
            value={form.image}
            onChange={handleChange}
            className="student-crud-input student-crud-input-wide"
            onClick={e => e.target.select()}
          />
          <button type="submit" className="student-crud-btn">{editId ? "Update" : "Add"} Student</button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setForm({ firstName: "", lastName: "", email: "", gender: "", dob: "", image: "", studentId: "" }); }} className="student-crud-btn student-crud-btn-cancel">
              Cancel
            </button>
          )}
        </form>
        {error && <div className="student-crud-error">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="student-crud-table-wrap">
            <table className="student-crud-table">
              <thead>
                <tr>
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
                      <td>{student.image ? <img src={student.image} alt="student" className="student-crud-img" /> : ""}</td>
                      <td>
                        <button onClick={() => handleEdit(student)} className="student-crud-btn-edit">Edit</button>
                        <button onClick={() => handleDelete(student.id)} className="student-crud-btn-delete">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCrudPage;
