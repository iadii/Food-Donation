import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="about-container" style={{
        maxWidth: "1000px",
        margin: "2rem auto",
        padding: "0 1rem",
      }}>
        {/* Header Section */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ 
            background: "#1e293b", 
            padding: "2.5rem 2.5rem", 
            borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            border: "1px solid #334155",
            color: "#e2e8f0",
            textAlign: "center",
            marginBottom: "2rem"
          }}
        >
          <h2 style={{ 
            marginBottom: "1.5rem", 
            color: "#f8fafc",
            fontSize: "2.2rem",
            background: "linear-gradient(to right, #818cf8, #c7d2fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 20px rgba(129, 140, 248, 0.3)"
          }}>About FoodShare</h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ 
              color: "#94a3b8", 
              lineHeight: "1.8",
              maxWidth: "700px",
              margin: "0 auto",
              fontSize: "1.1rem"
            }}
          >
            FoodShare is a platform dedicated to reducing food waste and hunger by connecting donors with those in need. Our mission is to make food donation easy, transparent, and impactful.
          </motion.p>
        </motion.div>
        
        {/* Two Column Layout */}
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "2rem",
          justifyContent: "center"
        }}>
          {/* Left Column */}
          <motion.div
            className="about-left-column"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ 
              flex: "1 1 450px",
              background: "#1e293b", 
              padding: "2rem 2.5rem", 
              borderRadius: "1rem",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              border: "1px solid #334155",
              color: "#e2e8f0"
            }}
          >
            <div style={{ 
              borderLeft: "3px solid #818cf8", 
              paddingLeft: "1.5rem",
              marginBottom: "2rem"
            }}>
              <h3 style={{ 
                color: "#a5b4fc", 
                marginBottom: "1rem",
                fontSize: "1.4rem"
              }}>Our Mission</h3>
              <ul style={{ 
                color: "#cbd5e1", 
                paddingLeft: "1.5rem",
                lineHeight: "1.8"
              }}>
                <li>Reduce food waste in communities</li>
                <li>Empower individuals and organizations to donate surplus food</li>
                <li>Ensure transparency and trust in the donation process</li>
                <li>Build a network of volunteers and partners</li>
              </ul>
            </div>
            
            <div style={{ 
              borderLeft: "3px solid #818cf8", 
              paddingLeft: "1.5rem"
            }}>
              <h3 style={{ 
                color: "#a5b4fc", 
                marginBottom: "1rem",
                fontSize: "1.4rem"
              }}>Our Vision</h3>
              <p style={{ color: "#94a3b8", lineHeight: "1.8" }}>
                We envision a world where no food goes to waste and no one goes hungry. By leveraging technology and community spirit, we strive to create a sustainable, hunger-free future.
              </p>
            </div>
          </motion.div>
          
          {/* Right Column */}
          <motion.div
            className="about-right-column"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ 
              flex: "1 1 350px",
              background: "#1e293b", 
              padding: "2rem 2.5rem", 
              borderRadius: "1rem",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              border: "1px solid #334155",
              color: "#e2e8f0"
            }}
          >
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ 
                color: "#a5b4fc", 
                marginBottom: "1.5rem",
                fontSize: "1.4rem",
                textAlign: "center",
                borderBottom: "1px solid #334155",
                paddingBottom: "0.75rem"
              }}>Our Team</h3>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                }}
              >
                {[
                  { name: "Muzakkir Mahbub ", role: "Founder & Developer", emoji: "👨‍💻" },
                  { name: "Volunteers", role: "& Contributors", emoji: "👥" }
                ].map((member, index) => (
                  <motion.div 
                    key={index}
                    variants={{ 
                      hidden: { y: 20, opacity: 0 }, 
                      visible: { y: 0, opacity: 1 } 
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.75rem 1rem",
                      background: "#0f172a",
                      borderRadius: "0.75rem",
                      marginBottom: "0.75rem",
                      border: "1px solid #334155"
                    }}
                  >
                    <div style={{ 
                      width: "40px", 
                      height: "40px", 
                      borderRadius: "50%", 
                      background: "rgba(99, 102, 241, 0.2)", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      marginRight: "1rem",
                      fontSize: "1.2rem"
                    }}>
                      {member.emoji}
                    </div>
                    <div>
                      <h4 style={{ color: "#e2e8f0", marginBottom: "0.25rem" }}>{member.name}</h4>
                      <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <div>
              <h3 style={{ 
                color: "#a5b4fc", 
                marginBottom: "1.5rem",
                fontSize: "1.4rem",
                textAlign: "center",
                borderBottom: "1px solid #334155",
                paddingBottom: "0.75rem"
              }}>Our Journey</h3>
              <div style={{ 
                position: "relative",
                paddingLeft: "1.5rem",
                borderLeft: "2px dashed #4f46e5",
                marginLeft: "0.5rem"
              }}>
                {[
                  { year: "2023", event: "Idea Born", delay: 0.1 },
                  { year: "2024", event: "Platform Launched", delay: 0.2 },
                  { year: "2024", event: "1000+ Meals Donated", delay: 0.3 },
                  { year: "2025", event: "Expanding Nationwide", delay: 0.4 }
                ].map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: milestone.delay + 0.5, duration: 0.5 }}
                    style={{ 
                      marginBottom: "1.5rem",
                      position: "relative"
                    }}
                  >
                    <div style={{ 
                      position: "absolute",
                      left: "-1.75rem",
                      top: "0",
                      width: "1rem",
                      height: "1rem",
                      borderRadius: "50%",
                      background: "#4f46e5",
                      border: "2px solid #1e293b"
                    }}></div>
                    <h4 style={{ color: "#a5b4fc", marginBottom: "0.25rem" }}>{milestone.year}</h4>
                    <p style={{ color: "#cbd5e1" }}>{milestone.event}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}