import React from "react";
import { motion } from "framer-motion";

export default function DonationCard({ donation }) {
  return (
    <motion.div
      className="donation-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
      style={{
        background: "#1e293b",
        borderRadius: "1rem",
        padding: "1.5rem",
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        minWidth: "250px",
        margin: "0.5rem",
        border: "1px solid #334155",
        color: "#e2e8f0"
      }}
    >
      <h3 style={{ color: "#f8fafc" }}>{donation?.title || "Fresh Meals"}</h3>
      <p style={{ color: "#cbd5e1" }}>{donation?.description || "Nutritious meals available for donation."}</p>
      <div style={{ margin: "0.8rem 0" }}>
        <strong style={{ color: "#a5b4fc" }}>Quantity:</strong> {donation?.quantity || 10}
      </div>
      <div style={{ margin: "0.8rem 0" }}>
        <strong style={{ color: "#a5b4fc" }}>Location:</strong> {donation?.location || "City Center"}
      </div>
      <div style={{ margin: "0.8rem 0" }}>
        <strong style={{ color: "#a5b4fc" }}>Status:</strong> <span style={{ color: "#4ade80" }}>{donation?.status || "Available"}</span>
      </div>
    </motion.div>
  );
}