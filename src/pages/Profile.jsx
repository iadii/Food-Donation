import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { saveData } from "../utils/localStorage";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEdit, FaSave, FaTimes, FaCamera, FaHistory, FaHeart, FaHandHolding, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import "./Profile.css";

export default function Profile() {
  const { user, setUser, donations, requests } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [stats, setStats] = useState(null);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    address: user?.address || "",
  });

  useEffect(() => {
    if (profileImage) {
      if (typeof profileImage === 'string') {
        setImagePreview(profileImage);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(profileImage);
      }
    }
  }, [profileImage]);

  useEffect(() => {
    // Calculate statistics
    if (donations && requests) {
      setStats({
        totalDonations: donations.length,
        totalRequests: requests.length,
        recentActivity: [...donations, ...requests]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5),
        donationTypes: donations.reduce((acc, curr) => {
          const type = curr.category || "Other";
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {})
      });
    }
  }, [donations, requests]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    if (form.phone && !/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Phone number should be 10 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    // Convert image to base64 string for storage if it's a File object
    if (profileImage && profileImage instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { 
          ...form, 
          profileImage: reader.result 
        };
        setUser(updatedUser);
        saveData("user", updatedUser);
        setEditMode(false);
      };
      reader.readAsDataURL(profileImage);
    } else {
      const updatedUser = { 
        ...form, 
        profileImage: profileImage 
      };
      setUser(updatedUser);
      saveData("user", updatedUser);
      setEditMode(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#2e7d32'; // Darker green
      case 'pending': return '#e65100';   // Darker orange
      case 'cancelled': return '#c62828'; // Darker red
      default: return '#0d47a1';          // Darker blue
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        {/* Profile Header - Redesigned with card-like appearance */}
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Background pattern */}
          <div className="profile-header-background" />
          
          {/* Profile Image - Enhanced with better shadows and animations */}
          <motion.div 
            className="profile-image-container" 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Profile" 
              />
            ) : (
              <div className="profile-image-placeholder">
                <FaUser />
              </div>
            )}
            {editMode && (
              <label htmlFor="profile-image-input" className="profile-image-upload-label">
                <FaCamera style={{ marginRight: "0.5rem"}} />
                <span style={{fontSize: "1rem"}}>Change Photo</span>
                <input 
                  id="profile-image-input"
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            )}
          </motion.div>
          
          {/* User Info - Enhanced typography and spacing */}
          <div className="profile-user-info">
            <h1 className="profile-user-name">
              {user?.name || "User"}
            </h1>
            <div className="profile-user-details">
              <div className="profile-detail-badge">
                <FaEnvelope />
                {user?.email || "No email provided"}
              </div>
              
              {user?.phone && (
                <div className="profile-detail-badge">
                  <FaPhone />
                  {user.phone}
                </div>
              )}
              
              {user?.address && (
                <div className="profile-detail-badge">
                  <FaMapMarkerAlt />
                  {user.address}
                </div>
              )}
            </div>
          </div>
          
          {/* Stats - Redesigned with card-like appearance */}
          {stats && (
            <div className="profile-stats">
              <motion.div 
                className="profile-stat-card"
                whileHover={{ y: -5 }}
              >
                <div className="profile-stat-number">{stats.totalDonations}</div>
                <div className="profile-stat-label">Donations</div>
              </motion.div>
              
              <motion.div 
                className="profile-stat-card"
                whileHover={{ y: -5 }}
              >
                <div className="profile-stat-number">{stats.totalRequests}</div>
                <div className="profile-stat-label">Requests</div>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Tabs - Enhanced with better spacing and animations */}
        <motion.div
          className="profile-tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {["profile", "donations", "requests", "activity"].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ backgroundColor: "#f7fafc" }}
              className={`profile-tab-button ${activeTab === tab ? 'active' : ''}`}
            >
              {tab === "profile" && <FaUser />}
              {tab === "donations" && <FaHeart />}
              {tab === "requests" && <FaHandHolding />}
              {tab === "activity" && <FaHistory />}
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Content Area - Enhanced with better spacing and shadows */}
        <motion.div className="profile-content">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {editMode ? (
                  <div className="profile-form">
                    {/* <div style={{ marginBottom: "2rem" }}></div> */}
                    <div className="form-group">
                      <label className="form-label">
                        Name:
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className={`form-input ${errors.name ? 'error' : ''}`}
                        />
                        {errors.name && <p className="form-error"><FaExclamationTriangle /> {errors.name}</p>}
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        Email:
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className={`form-input ${errors.email ? 'error' : ''}`}
                        />
                        {errors.email && <p className="form-error"><FaExclamationTriangle /> {errors.email}</p>}
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        Phone:
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className={`form-input ${errors.phone ? 'error' : ''}`}
                        />
                        {errors.phone && <p className="form-error"><FaExclamationTriangle /> {errors.phone}</p>}
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        Address:
                        <input
                          type="text"
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </label>
                    </div>
                    
                    <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                      <label className="form-label">
                        Bio:
                        <textarea
                          name="bio"
                          value={form.bio}
                          onChange={handleChange}
                          rows={4}
                          className="form-input form-textarea"
                        />
                      </label>
                    </div>
                    
                    <div className="profile-actions" style={{ gridColumn: "1 / -1" }}>
                      <button 
                        onClick={() => setEditMode(false)} 
                        className="btn btn-secondary"
                      >
                        <FaTimes /> Cancel
                      </button>
                      <button 
                        onClick={handleSave} 
                        className="btn btn-primary"
                      >
                        <FaSave /> Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="profile-info">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                        gap: "2rem",
                        marginBottom: "2rem"
                      }}
                    >
                      <motion.div 
                        className="info-card" 
                        whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                        style={{
                          padding: "2rem",
                          borderRadius: "1rem",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                          backgroundColor: "#f8fafc",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <h3 style={{ 
                          margin: "0 0 1.5rem", 
                          color: "#1a365d", 
                          borderBottom: "2px solid #8e2de2", 
                          paddingBottom: "0.75rem",
                          fontSize: "1.5rem"
                        }}>
                          Personal Information
                        </h3>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ 
                              width: "40px", 
                              height: "40px", 
                              borderRadius: "50%", 
                              backgroundColor: "rgba(142, 45, 226, 0.1)", 
                              display: "flex", 
                              alignItems: "center", 
                              justifyContent: "center",
                              color: "#8e2de2"
                            }}>
                              <FaUser />
                            </div>
                            <div>
                              <div style={{ fontSize: "0.9rem", color: "#718096" }}>Name</div>
                              <div style={{ fontSize: "1.2rem", color: "#2d3748", fontWeight: "500" }}>{user?.name || "N/A"}</div>
                            </div>
                          </div>
                          
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ 
                              width: "40px", 
                              height: "40px", 
                              borderRadius: "50%", 
                              backgroundColor: "rgba(142, 45, 226, 0.1)", 
                              display: "flex", 
                              alignItems: "center", 
                              justifyContent: "center",
                              color: "#8e2de2"
                            }}>
                              <FaEnvelope />
                            </div>
                            <div>
                              <div style={{ fontSize: "0.9rem", color: "#718096" }}>Email</div>
                              <div style={{ fontSize: "1.2rem", color: "#2d3748", fontWeight: "500" }}>{user?.email || "N/A"}</div>
                            </div>
                          </div>
                          
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ 
                              width: "40px", 
                              height: "40px", 
                              borderRadius: "50%", 
                              backgroundColor: "rgba(142, 45, 226, 0.1)", 
                              display: "flex", 
                              alignItems: "center", 
                              justifyContent: "center",
                              color: "#8e2de2"
                            }}>
                              <FaPhone />
                            </div>
                            <div>
                              <div style={{ fontSize: "0.9rem", color: "#718096" }}>Phone</div>
                              <div style={{ fontSize: "1.2rem", color: "#2d3748", fontWeight: "500" }}>{user?.phone || "N/A"}</div>
                            </div>
                          </div>
                          
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ 
                              width: "40px", 
                              height: "40px", 
                              borderRadius: "50%", 
                              backgroundColor: "rgba(142, 45, 226, 0.1)", 
                              display: "flex", 
                              alignItems: "center", 
                              justifyContent: "center",
                              color: "#8e2de2"
                            }}>
                              <FaMapMarkerAlt />
                            </div>
                            <div>
                              <div style={{ fontSize: "0.9rem", color: "#718096" }}>Address</div>
                              <div style={{ fontSize: "1.2rem", color: "#2d3748", fontWeight: "500" }}>{user?.address || "N/A"}</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="info-card"
                        whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                        style={{
                          padding: "2rem",
                          borderRadius: "1rem",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                          backgroundColor: "#f8fafc",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <h3 style={{ 
                          margin: "0 0 1.5rem", 
                          color: "#1a365d", 
                          borderBottom: "2px solid #8e2de2", 
                          paddingBottom: "0.75rem",
                          fontSize: "1.5rem"
                        }}>
                          About Me
                        </h3>
                        <p style={{ 
                          margin: "0", 
                          fontSize: "1.1rem", 
                          lineHeight: "1.8", 
                          color: "#2d3748",
                          backgroundColor: "white",
                          padding: "1.5rem",
                          borderRadius: "0.75rem",
                          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
                        }}>
                          {user?.bio || "No bio information provided."}
                        </p>
                      </motion.div>
                      
                      {stats && (
                        <div className="info-card" style={{
                          padding: "1.5rem",
                          borderRadius: "0.75rem",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                          backgroundColor: "#f0f4f8"
                        }}>
                          <h3 style={{ margin: "0 0 1rem", color: "#1a365d", borderBottom: "2px solid #2575fc", paddingBottom: "0.5rem" }}>Activity Summary</h3>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {stats.recentActivity.length > 0 ? (
                              stats.recentActivity.map((activity, index) => (
                                <div key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#2d3748" }}>
                                  {activity.type === "donation" ? <FaHeart color="#e91e63" /> : <FaHandHolding color="#2196f3" />}
                                  <span>{activity.type === "donation" ? "Donated" : "Requested"} {activity.item || activity.title}</span>
                                  <span style={{ marginLeft: "auto", fontSize: "0.9rem", opacity: 0.8 }}>
                                    {/* <FaCalendarAlt style={{ marginRight: "0.25rem" }} />  */}
                                    {/* {formatDate(activity.date)} */}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <p style={{ color: "#2d3748" }}>No recent activity.</p>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                    
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "2rem" }}>
                      <button 
                        onClick={() => setEditMode(true)} 
                        className="btn btn-secondary"
                      >
                        <FaEdit /> Edit Profile
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "donations" && (
              <motion.div
                key="donations"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h2 style={{ borderBottom: "2px solid #2575fc", paddingBottom: "0.5rem", marginBottom: "1.5rem" , color:"#4a5568"


                }}>My Donations</h2>
                
                {stats && Object.keys(stats.donationTypes).length > 0 && (
                  <div style={{ 
                    marginBottom: "2rem", 
                    padding: "1.5rem", 
                    borderRadius: "0.75rem", 
                    backgroundColor: "#f0f7ff" 
                  }}>
                    <h3 style={{ marginTop: 0 , color:"#4a5568"}}>Donation Categories</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                      {Object.entries(stats.donationTypes).map(([category, count], idx) => (
                        <div key={idx} style={{ 
                          padding: "0.5rem 1rem", 
                          borderRadius: "2rem", 
                          backgroundColor: "#2575fc", 
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem"
                        }}>
                          <span>{category}</span>
                          <span style={{ 
                            backgroundColor: "white", 
                            color: "#2575fc", 
                            borderRadius: "50%", 
                            width: "1.5rem", 
                            height: "1.5rem", 
                            display: "inline-flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            fontWeight: "bold"
                          }}>{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {donations && donations.length > 0 ? (
                  <div className="donations-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "1.5rem"
                  }}>
                    {donations.map((don, idx) => (
                      <motion.div
                        key={idx}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        transition={{ delay: idx * 0.1 }}
                        style={{
                          padding: "1.5rem",
                          borderRadius: "0.75rem",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                          backgroundColor: "#f9f9f9",
                          border: "1px solid #eaeaea",
                          position: "relative",
                          overflow: "hidden"
                        }}
                      >
                        <div style={{ 
                          position: "absolute", 
                          top: 0, 
                          left: 0, 
                          width: "5px", 
                          height: "100%", 
                          backgroundColor: "#2575fc" 
                        }}></div>
                        <div style={{ 
                          position: "absolute", 
                          top: "1rem", 
                          right: "1rem", 
                          backgroundColor: don.status === "completed" ? "#4CAF50" : "#FF9800",
                          color: "white",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "1rem",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem"
                        }}>
                          {don.status === "completed" ? <FaCheck /> : <FaExclamationTriangle />}
                          {don.status || "Pending"}
                        </div>
                        <h3 style={{ margin: "0 0 0.75rem", color: "#333" }}>{don.food}</h3>
                        <div style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          margin: "0.5rem 0", 
                          color: "#666" 
                        }}>
                          <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
                          <strong>Date:</strong> {formatDate(don.date)}
                        </div>
                        {don.quantity && (
                          <p style={{ margin: "0.5rem 0", color: "#666" }}>
                            <strong>Quantity:</strong> {don.quantity}
                          </p>
                        )}
                        {don.location && (
                          <div style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            margin: "0.5rem 0", 
                            color: "#666" 
                          }}>
                            <FaMapMarkerAlt style={{ marginRight: "0.5rem" }} />
                            <strong>Location:</strong> {don.location}
                          </div>
                        )}
                        {don.notes && (
                          <p style={{ 
                            margin: "1rem 0 0", 
                            padding: "0.75rem", 
                            backgroundColor: "#f0f0f0", 
                            borderRadius: "0.5rem",
                            fontSize: "0.9rem",
                            fontStyle: "italic"
                          }}>
                            "{don.notes}"
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div style={{ 
                    textAlign: "center", 
                    padding: "3rem 1rem", 
                    backgroundColor: "#f9f9f9", 
                    borderRadius: "0.75rem",
                    color: "#757575"
                  }}>
                    <FaHeart style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.5 }} />
                    <h3>No donations yet</h3>
                    <p>Your donations will appear here once you start contributing.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "requests" && (
              <motion.div
                key="requests"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >

                <h2 style={{ borderBottom: "2px solid #2575fc", paddingBottom: "0.5rem", marginBottom: "1.5rem", color:"#4a5568" }}>My Requests</h2>

                {requests && requests.length > 0 ? (
                  <div className="requests-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "1.5rem"
                  }}>
                    {requests.map((req, idx) => (
                      <motion.div
                        key={idx}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        transition={{ delay: idx * 0.1 }}
                        style={{
                          padding: "1.5rem",
                          borderRadius: "0.75rem",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                          backgroundColor: "#f9f9f9",
                          border: "1px solid #eaeaea",
                          position: "relative",
                          overflow: "hidden"
                        }}
                      >
                        <div style={{ 
                          position: "absolute", 
                          top: 0, 
                          left: 0, 
                          width: "5px", 
                          height: "100%", 
                          backgroundColor: "#ff9800" 
                        }}></div>
                        <h3 style={{ margin: "0 0 0.75rem", color: "#333" }}>{req.food}</h3>
                        <p style={{ margin: "0.5rem 0", color: "#666" }}><strong>Date:</strong> {formatDate(req.date)}</p>
                        {req.quantity && <p style={{ margin: "0.5rem 0", color: "#666" }}><strong>Quantity:</strong> {req.quantity}</p>}
                        {req.location && <p style={{ margin: "0.5rem 0", color: "#666" }}><strong>Location:</strong> {req.location}</p>}
                        {req.urgency && <p style={{ margin: "0.5rem 0", color: "#666" }}><strong>Urgency:</strong> {req.urgency}</p>}
                        {req.notes && <p style={{ margin: "0.5rem 0", color: "#666" }}><strong>Notes:</strong> {req.notes}</p>}
                        <div style={{ 
                          marginTop: "1rem", 
                          padding: "0.5rem", 
                          backgroundColor: "#fff3e0", 
                          borderRadius: "0.5rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem"
                        }}>
                          <FaHandHolding style={{ color: "#ff9800" }} />
                          <span style={{ color: "#ff9800", fontWeight: "bold" }}>Request status: {req.status || "Pending"}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div style={{ 
                    padding: "2rem", 
                    textAlign: "center", 
                    backgroundColor: "#f9f9f9", 
                    borderRadius: "0.75rem",
                    border: "1px dashed #ccc"
                  }}>
                    <FaHandHolding style={{ fontSize: "3rem", color: "#ccc", marginBottom: "1rem" }} />
                    <h3 style={{ margin: "0 0 0.5rem", color: "#666" }}>No requests yet</h3>
                    <p style={{ color: "#888" }}>Your food requests will appear here once you make them.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "activity" && (
              <motion.div
                key="activity"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >

                <h2 style={{ borderBottom: "2px solid #2575fc", paddingBottom: "0.5rem", marginBottom: "1.5rem", color:"#4a5568" }}>Recent Activity</h2>

                <div className="activity-timeline" style={{
                  position: "relative",
                  paddingLeft: "2rem",
                  marginLeft: "1rem"
                }}>
                  <div style={{ 
                    position: "absolute", 
                    left: 0, 
                    top: 0, 
                    bottom: 0, 
                    width: "2px", 
                    backgroundColor: "#e0e0e0" 
                  }}></div>
                  
                  {[...(donations || []), ...(requests || [])].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10).map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      style={{
                        position: "relative",
                        marginBottom: "2rem",
                        paddingBottom: "1rem",
                        borderBottom: idx === [...(donations || []), ...(requests || [])].length - 1 ? "none" : "1px solid #f0f0f0"
                      }}
                    >
                      <div style={{ 
                        position: "absolute", 
                        left: "-2.5rem", 
                        top: 0, 
                        width: "1rem", 
                        height: "1rem", 
                        borderRadius: "50%", 
                        backgroundColor: 'food' in item ? "#2575fc" : "#ff9800",
                        border: "3px solid white",
                        boxShadow: "0 0 0 2px " + ('food' in item ? "#2575fc50" : "#ff980050")
                      }}></div>
                      <div style={{ 
                        backgroundColor: 'food' in item ? "#e3f2fd" : "#fff3e0", 
                        padding: "1rem", 
                        borderRadius: "0.75rem",
                        marginBottom: "0.5rem"
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                          <h3 style={{ margin: 0, color: "#333" }}>
                            {'food' in item ? (
                              <>
                                <FaHeart style={{ color: "#2575fc", marginRight: "0.5rem" }} />
                                Donation: {item.food}
                              </>
                            ) : (
                              <>
                                <FaHandHolding style={{ color: "#ff9800", marginRight: "0.5rem" }} />
                                Request: {item.food}
                              </>
                            )}
                          </h3>
                          <span style={{ fontSize: "0.875rem", color: "#757575" }}>{formatDate(item.date)}</span>
                        </div>
                        <p style={{ margin: "0.5rem 0 0", color: "#666" }}>
                          {item.notes || (
                            'food' in item ? 
                              "You donated this item to help someone in need." : 
                              "You requested this item."
                          )}
                        </p>
                      </div>
                    </motion.div>
                  ))}
{stats && (
  <div className="info-card" style={{
    padding: "1.5rem",
    borderRadius: "0.75rem",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    backgroundColor: "#f9f9f9",
    gridColumn: "1 / -1"
  }}>
    <h3 style={{ margin: "0 0 1rem", color: "#333", borderBottom: "2px solid #2575fc", paddingBottom: "0.5rem" }}>Activity Statistics</h3>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
      <div>
        <h4 style={{ color: "#2575fc", marginBottom: "1rem" }}>Donation Types</h4>
        {Object.entries(stats.donationTypes).map(([type, count]) => (

          <div key={type} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", color:"#4a5568" }}>

            <span>{type}:</span>
            <span>{count}</span>
          </div>
        ))}
      </div>
      <div>
        <h4 style={{ color: "#2575fc", marginBottom: "1rem" }}>Recent Activity</h4>
        {stats.recentActivity.map((activity, index) => (
          <div key={index} style={{ 
            display: "flex", 
            alignItems: "center", 
            marginBottom: "0.75rem",
            padding: "0.5rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            {activity.type === 'donation' ? <FaHeart style={{ color: "#e91e63", marginRight: "0.5rem" }} /> : <FaHandHolding style={{ color: "#2196f3", marginRight: "0.5rem" }} />}
            <div style={{ flex: 1 }}>

              <div style={{ fontWeight: "500", color:"#4a5568" }}>{activity.title}</div>


            </div>
            <div style={{
              padding: "0.25rem 0.75rem",
              borderRadius: "1rem",
              fontSize: "0.875rem",
              backgroundColor: getStatusColor(activity.status),
              color: "white"
            }}>
              {activity.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
                  {(!donations || donations.length === 0) && (!requests || requests.length === 0) && (
                    <div style={{ 
                      padding: "2rem", 
                      textAlign: "center", 
                      backgroundColor: "#f9f9f9", 
                      borderRadius: "0.75rem",
                      border: "1px dashed #ccc"
                    }}>
                      <FaHistory style={{ fontSize: "3rem", color: "#ccc", marginBottom: "1rem" }} />
                      <h3 style={{ margin: "0 0 0.5rem", color: "#666" }}>No activity yet</h3>
                      <p style={{ color: "#888" }}>Your activity history will appear here once you start donating or requesting items.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}