import React, { useState } from "react";


const SettingsPage = () => {
  const [form, setForm] = useState({
    name: "Admin",
    image: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage for now
    localStorage.setItem('adminProfile', JSON.stringify(form));
    // Dispatch custom event to notify Sidebar
    window.dispatchEvent(new Event('adminProfileUpdated'));
    setMessage("Profile updated!");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#181818", padding: 32, borderRadius: 16, minWidth: 320 }}>
        <h2>Edit Admin Profile</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={{ background: "#222", color: "#fff", border: "1px solid #444", borderRadius: 4, padding: 6, marginTop: 4 }}
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              style={{ background: "#222", color: "#fff", border: "1px solid #444", borderRadius: 4, padding: 6, marginTop: 4 }}
              onClick={e => e.target.select()}
            />
          </label>
          <button type="submit" style={{ background: "#007bff", color: "#fff", border: "none", borderRadius: 4, padding: "8px 16px" }}>Save</button>
        </form>
        {message && <div style={{ color: "#0f0", marginTop: 16 }}>{message}</div>}
        {form.image && (
          <div style={{ marginTop: 16 }}>
            <img src={form.image} alt="Admin" style={{ width: 64, height: 64, borderRadius: "50%" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
