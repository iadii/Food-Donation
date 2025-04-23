import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getData } from "../utils/localStorage";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("donations");
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    totalDonations: 0,
    pendingRequests: 0,
    completedDonations: 0
  });

  useEffect(() => {
    // Load data from localStorage
    const donationsData = getData("donations") || [];
    const requestsData = getData("requests") || [];
    
    setDonations(donationsData);
    setRequests(requestsData);
    
    // Calculate stats
    setStats({
      totalDonations: donationsData.length,
      pendingRequests: requestsData.filter(req => req.status === "Pending").length,
      completedDonations: donationsData.filter(don => don.status === "Completed").length
    });
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case "Available": return "#10b981"; // green
      case "Pending": return "#f59e0b"; // amber
      case "Completed": return "#6366f1"; // indigo
      default: return "#6b7280"; // gray
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container" style={{ 
        maxWidth: "1000px", 
        margin: "2rem auto",
        padding: "0 1rem"
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "#1e293b",
            borderRadius: "1rem",
            padding: "2rem 2.5rem",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            border: "1px solid #334155",
            color: "#e2e8f0",
            marginBottom: "2rem"
          }}
        >
          <h1 style={{ 
            textAlign: "center",
            fontSize: "2rem",
            marginBottom: "1.5rem",
            background: "linear-gradient(to right, #818cf8, #c7d2fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 20px rgba(129, 140, 248, 0.3)"
          }}>
            Dashboard
          </h1>
          
          <div className="stats-container" style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2rem"
          }}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="stat-card" 
              style={{
                flex: "1 1 200px",
                background: "#0f172a",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                border: "1px solid #334155",
                textAlign: "center"
              }}
            >
              <h3 style={{ color: "#a5b4fc", marginBottom: "0.5rem" }}>Total Donations</h3>
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{stats.totalDonations}</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="stat-card" 
              style={{
                flex: "1 1 200px",
                background: "#0f172a",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                border: "1px solid #334155",
                textAlign: "center"
              }}
            >
              <h3 style={{ color: "#a5b4fc", marginBottom: "0.5rem" }}>Pending Requests</h3>
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{stats.pendingRequests}</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="stat-card" 
              style={{
                flex: "1 1 200px",
                background: "#0f172a",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                border: "1px solid #334155",
                textAlign: "center"
              }}
            >
              <h3 style={{ color: "#a5b4fc", marginBottom: "0.5rem" }}>Completed</h3>
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{stats.completedDonations}</p>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            background: "#1e293b",
            borderRadius: "1rem",
            padding: "2rem 2.5rem",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            border: "1px solid #334155",
            color: "#e2e8f0"
          }}
        >
          <div className="tabs" style={{
            display: "flex",
            borderBottom: "1px solid #334155",
            marginBottom: "1.5rem"
          }}>
            <button 
              onClick={() => setActiveTab("donations")}
              style={{
                padding: "0.75rem 1.5rem",
                background: activeTab === "donations" ? "#0f172a" : "transparent",
                border: "none",
                borderBottom: activeTab === "donations" ? "2px solid #818cf8" : "none",
                color: activeTab === "donations" ? "#e2e8f0" : "#94a3b8",
                fontWeight: activeTab === "donations" ? "600" : "400",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              My Donations
            </button>
            <button 
              onClick={() => setActiveTab("requests")}
              style={{
                padding: "0.75rem 1.5rem",
                background: activeTab === "requests" ? "#0f172a" : "transparent",
                border: "none",
                borderBottom: activeTab === "requests" ? "2px solid #818cf8" : "none",
                color: activeTab === "requests" ? "#e2e8f0" : "#94a3b8",
                fontWeight: activeTab === "requests" ? "600" : "400",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              My Requests
            </button>
          </div>
          
          {activeTab === "donations" && (
            <div className="donations-list">
              {donations.length === 0 ? (
                <p style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>
                  You haven't made any donations yet. <a href="/donate" style={{ color: "#818cf8", textDecoration: "none" }}>Donate now</a>
                </p>
              ) : (
                donations.map((donation, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    style={{
                      background: "#0f172a",
                      padding: "1.25rem",
                      borderRadius: "0.75rem",
                      marginBottom: "1rem",
                      border: "1px solid #334155",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "1rem"
                    }}
                  >
                    <div style={{ flex: "1 1 300px" }}>
                      <h3 style={{ marginBottom: "0.5rem", color: "#f8fafc" }}>{donation.title}</h3>
                      <p style={{ color: "#94a3b8", marginBottom: "0.5rem" }}>{donation.description}</p>
                      <div style={{ display: "flex", gap: "1rem", color: "#94a3b8", fontSize: "0.875rem" }}>
                        <span>Quantity: {donation.quantity}</span>
                        <span>Location: {donation.location}</span>
                      </div>
                    </div>
                    <div style={{ 
                      padding: "0.5rem 1rem", 
                      borderRadius: "9999px", 
                      background: `${getStatusColor(donation.status)}20`,
                      color: getStatusColor(donation.status),
                      fontWeight: "500",
                      fontSize: "0.875rem"
                    }}>
                      {donation.status}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
          
          {activeTab === "requests" && (
            <div className="requests-list">
              {requests.length === 0 ? (
                <p style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>
                  You haven't made any requests yet. <a href="/request" style={{ color: "#818cf8", textDecoration: "none" }}>Request now</a>
                </p>
              ) : (
                requests.map((request, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    style={{
                      background: "#0f172a",
                      padding: "1.25rem",
                      borderRadius: "0.75rem",
                      marginBottom: "1rem",
                      border: "1px solid #334155",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "1rem"
                    }}
                  >
                    <div style={{ flex: "1 1 300px" }}>
                      <h3 style={{ marginBottom: "0.5rem", color: "#f8fafc" }}>{request.title}</h3>
                      <p style={{ color: "#94a3b8", marginBottom: "0.5rem" }}>{request.description}</p>
                      <div style={{ display: "flex", gap: "1rem", color: "#94a3b8", fontSize: "0.875rem" }}>
                        <span>People: {request.people}</span>
                        <span>Location: {request.location}</span>
                      </div>
                    </div>
                    <div style={{ 
                      padding: "0.5rem 1rem", 
                      borderRadius: "9999px", 
                      background: `${getStatusColor(request.status)}20`,
                      color: getStatusColor(request.status),
                      fontWeight: "500",
                      fontSize: "0.875rem"
                    }}>
                      {request.status}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </>
  );
}