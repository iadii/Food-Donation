import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { saveData } from "../utils/localStorage";
import { motion } from "framer-motion";

export default function Profile() {
  const { user, setUser, donations, requests } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(form);
    saveData("user", form);
    setEditMode(false);
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="profile-page"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          maxWidth: 700,
          margin: "2rem auto",
          background: "#fff",
          padding: "2rem",
          borderRadius: "1rem"
        }}
      >
        <h2>My Profile</h2>
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {editMode ? (
            <div className="profile-form">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </label>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          ) : (
            <div className="profile-info">
              <p><strong>Name:</strong> {user?.name || "N/A"}</p>
              <p><strong>Email:</strong> {user?.email || "N/A"}</p>
              <p><strong>Phone:</strong> {user?.phone || "N/A"}</p>
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
            </div>
          )}
        </motion.div>
        <hr style={{ margin: "2rem 0" }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3>My Donations</h3>
          <ul>
            {donations && donations.length > 0 ? (
              donations.map((don, idx) => (
                <motion.li
                  key={idx}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {don.food} &mdash; {don.date}
                </motion.li>
              ))
            ) : (
              <li>No donations yet.</li>
            )}
          </ul>
          <h3 style={{ marginTop: "2rem" }}>My Requests</h3>
          <ul>
            {requests && requests.length > 0 ? (
              requests.map((req, idx) => (
                <motion.li
                  key={idx}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {req.food} &mdash; {req.date}
                </motion.li>
              ))
            ) : (
              <li>No requests yet.</li>
            )}
          </ul>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
}