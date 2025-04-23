import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import { saveData, getData } from "../utils/localStorage";

export default function Donate() {
  const [form, setForm] = useState({ title: "", description: "", quantity: "", location: "" });
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const donations = getData("donations") || [];
    saveData("donations", [...donations, { ...form, status: "Available" }]);
    setShowModal(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    setForm({ title: "", description: "", quantity: "", location: "" });
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="donate-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        style={{ 
          maxWidth: 500, 
          margin: "2rem auto", 
          background: "#1e293b", 
          padding: "2rem 3.5rem 2rem 2.5rem", 
          borderRadius: "1rem",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          border: "1px solid #334155",
          color: "#e2e8f0"
        }}
      >
        <h2 style={{ 
          textAlign: "center", 
          marginBottom: "1.5rem", 
          color: "#f8fafc",
          fontSize: "1.8rem",
          background: "linear-gradient(to right, #818cf8, #c7d2fe)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 0 20px rgba(129, 140, 248, 0.3)"
        }}>Donate Food</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="input-group">
            <label htmlFor="title" style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              fontWeight: "500",
              color: "#a5b4fc" 
            }}>Title</label>
            <input 
              id="title"
              name="title" 
              placeholder="What food are you donating?" 
              value={form.title} 
              onChange={handleChange} 
              required 
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "0.5rem",
                border: "1px solid #334155",
                fontSize: "1rem",
                transition: "border-color 0.3s, box-shadow 0.3s",
                outline: "none",
                background: "#0f172a",
                color: "#e2e8f0"
              }}
              onFocus={(e) => e.target.style.borderColor = "#818cf8"}
              onBlur={(e) => e.target.style.borderColor = "#334155"}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="description" style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              fontWeight: "500",
              color: "#a5b4fc" 
            }}>Description</label>
            <textarea 
              id="description"
              name="description" 
              placeholder="Provide details about the food" 
              value={form.description} 
              onChange={handleChange} 
              required 
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "0.5rem",
                border: "1px solid #334155",
                fontSize: "1rem",
                minHeight: "100px",
                resize: "vertical",
                fontFamily: "inherit",
                transition: "border-color 0.3s, box-shadow 0.3s",
                outline: "none",
                background: "#0f172a",
                color: "#e2e8f0"
              }}
              onFocus={(e) => e.target.style.borderColor = "#818cf8"}
              onBlur={(e) => e.target.style.borderColor = "#334155"}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="quantity" style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              fontWeight: "500",
              color: "#a5b4fc" 
            }}>Quantity</label>
            <input 
              id="quantity"
              name="quantity" 
              type="number" 
              placeholder="How many servings?" 
              value={form.quantity} 
              onChange={handleChange} 
              required 
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "0.5rem",
                border: "1px solid #334155",
                fontSize: "1rem",
                transition: "border-color 0.3s, box-shadow 0.3s",
                outline: "none",
                background: "#0f172a",
                color: "#e2e8f0"
              }}
              onFocus={(e) => e.target.style.borderColor = "#818cf8"}
              onBlur={(e) => e.target.style.borderColor = "#334155"}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="location" style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              fontWeight: "500",
              color: "#a5b4fc" 
            }}>Location</label>
            <input 
              id="location"
              name="location" 
              placeholder="Where can people pick up the food?" 
              value={form.location} 
              onChange={handleChange} 
              required 
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "0.5rem",
                border: "1px solid #334155",
                fontSize: "1rem",
                transition: "border-color 0.3s, box-shadow 0.3s",
                outline: "none",
                background: "#0f172a",
                color: "#e2e8f0"
              }}
              onFocus={(e) => e.target.style.borderColor = "#818cf8"}
              onBlur={(e) => e.target.style.borderColor = "#334155"}
            />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={{
              marginTop: "1rem",
              padding: "0.8rem 1.5rem",
              backgroundColor: "#6366f1",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s",
              boxShadow: "0 2px 10px rgba(99, 102, 241, 0.4)"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#4f46e5"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#6366f1"}
          >
            Donate Now
          </motion.button>
        </form>
      </motion.div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h3>Thank you for your donation!</h3>
        <p>Your food donation has been listed.</p>
      </Modal>
      <Toast message="Donation submitted!" show={showToast} />
      <Footer />
    </>
  );
}