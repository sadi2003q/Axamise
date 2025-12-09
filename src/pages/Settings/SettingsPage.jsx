import React, { useState } from "react";

import "./SettingsPage.css";


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
    <div className="settings-responsive-bg">
      <div className="settings-responsive-card">
        <h2 className="settings-responsive-title">Edit Admin Profile</h2>
        <form onSubmit={handleSubmit} className="settings-responsive-form">
          <label className="settings-responsive-label">
            Name:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="settings-responsive-input"
            />
          </label>
          <label className="settings-responsive-label">
            Image URL:
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="settings-responsive-input"
              onClick={e => e.target.select()}
            />
          </label>
          <button type="submit" className="settings-responsive-btn">Save</button>
        </form>
        {message && <div className="settings-responsive-message">{message}</div>}
        {form.image && (
          <div className="settings-responsive-img-wrap">
            <img src={form.image} alt="Admin" className="settings-responsive-img" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
