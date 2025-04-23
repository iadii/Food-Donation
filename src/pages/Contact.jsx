import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toast from "../components/Toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [showToast, setShowToast] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    console.log("Form submitted:", form);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <div className="contact-container" style={{
        maxWidth: "1000px",
        margin: "2rem auto",
        padding: "0 1rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "center"
      }}>
        {/* Contact Form Card - Left Side */}
        <motion.div
          className="contact-form-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          style={{ 
            flex: "1 1 450px",
            maxWidth: "500px",
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
          }}>Contact Us</h2>
          
          <p style={{ 
            textAlign: "center", 
            marginBottom: "2rem", 
            color: "#94a3b8",
            lineHeight: "1.6"
          }}>
            Have questions about donating or requesting food? Get in touch with our team and we'll get back to you as soon as possible.
          </p>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="input-group">
              <label htmlFor="name" style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                fontWeight: "500",
                color: "#a5b4fc" 
              }}>Name</label>
              <input 
                id="name"
                name="name" 
                placeholder="Your name" 
                value={form.name} 
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
              <label htmlFor="email" style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                fontWeight: "500",
                color: "#a5b4fc" 
              }}>Email</label>
              <input 
                id="email"
                name="email" 
                type="email"
                placeholder="Your email address" 
                value={form.email} 
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
              <label htmlFor="message" style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                fontWeight: "500",
                color: "#a5b4fc" 
              }}>Message</label>
              <textarea 
                id="message"
                name="message" 
                placeholder="How can we help you?" 
                value={form.message} 
                onChange={handleChange} 
                required 
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #334155",
                  fontSize: "1rem",
                  minHeight: "150px",
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
              Send Message
            </motion.button>
          </form>
        </motion.div>
        
        {/* Contact Info Card - Right Side */}
        <motion.div
          className="contact-info-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ 
            flex: "1 1 300px",
            maxWidth: "350px",
            background: "#1e293b", 
            padding: "2rem 2.5rem", 
            borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            border: "1px solid #334155",
            color: "#e2e8f0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
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
          }}>Other Ways to Reach Us</h2>
          
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "1.5rem",
            marginTop: "1rem"
          }}>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "1rem", 
                color: "#94a3b8",
                background: "#0f172a",
                padding: "1rem",
                borderRadius: "0.75rem",
                border: "1px solid #334155"
              }}
            >
              <div style={{ 
                width: "50px", 
                height: "50px", 
                borderRadius: "50%", 
                background: "rgba(99, 102, 241, 0.2)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                border: "1px solid rgba(129, 140, 248, 0.3)"
              }}>
                <span role="img" aria-label="email" style={{ fontSize: "1.5rem" }}>📧</span>
              </div>
              <div>
                <h3 style={{ color: "#a5b4fc", marginBottom: "0.25rem", fontSize: "1rem" }}>Email Us</h3>
                <span>support@mujibhai.org</span>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "1rem", 
                color: "#94a3b8",
                background: "#0f172a",
                padding: "1rem",
                borderRadius: "0.75rem",
                border: "1px solid #334155"
              }}
            >
              <div style={{ 
                width: "50px", 
                height: "50px", 
                borderRadius: "50%", 
                background: "rgba(99, 102, 241, 0.2)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                border: "1px solid rgba(129, 140, 248, 0.3)"
              }}>
                <span role="img" aria-label="phone" style={{ fontSize: "1.5rem" }}>📞</span>
              </div>
              <div>
                <h3 style={{ color: "#a5b4fc", marginBottom: "0.25rem", fontSize: "1rem" }}>Call Us</h3>
                <span>+1 (555) 123-4567</span>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "1rem", 
                color: "#94a3b8",
                background: "#0f172a",
                padding: "1rem",
                borderRadius: "0.75rem",
                border: "1px solid #334155"
              }}
            >
              <div style={{ 
                width: "50px", 
                height: "50px", 
                borderRadius: "50%", 
                background: "rgba(99, 102, 241, 0.2)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                border: "1px solid rgba(129, 140, 248, 0.3)"
              }}>
                <span role="img" aria-label="location" style={{ fontSize: "1.5rem" }}>📍</span>
              </div>
              <div>
                <h3 style={{ color: "#a5b4fc", marginBottom: "0.25rem", fontSize: "1rem" }}>Visit Us</h3>
                <span>123 Food Drive, Charity City, CA 90210</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Toast message="Message sent successfully!" show={showToast} />
      <Footer />
    </>
  );
}