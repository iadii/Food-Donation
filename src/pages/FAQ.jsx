import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How does FoodShare work?",
      answer: "FoodShare connects food donors with people in need. Donors can list their surplus food, and those who need food can request it. Our platform facilitates the connection and helps coordinate the logistics of food donation."
    },
    {
      question: "Who can donate food?",
      answer: "Anyone can donate food! Individuals, restaurants, cafes, grocery stores, event organizers, and corporate offices are all welcome to donate their surplus food. All we ask is that the food is still safe to consume and properly handled."
    },
    {
      question: "What types of food can I donate?",
      answer: "You can donate packaged foods, fresh produce, prepared meals, and more. The key requirements are that the food must be unexpired, properly stored, and safe for consumption. For prepared foods, please ensure they've been handled according to food safety guidelines."
    },
    {
      question: "How do I know my donation reaches someone in need?",
      answer: "Our platform tracks the status of each donation from listing to delivery. You'll receive notifications when someone requests your donation and when it's been successfully picked up or delivered. We also encourage recipients to acknowledge receipt of donations."
    },
    {
      question: "Is there a cost to use FoodShare?",
      answer: "No, FoodShare is completely free to use for both donors and recipients. We're a non-profit organization dedicated to reducing food waste and hunger in our communities."
    },
    {
      question: "How can I request food?",
      answer: "To request food, simply create an account, browse available donations in your area, and submit a request for the items you need. You can communicate with the donor through our messaging system to arrange pickup or delivery details."
    },
    {
      question: "How is food safety ensured?",
      answer: "While we provide guidelines for food safety, donors are responsible for ensuring their donations are safe for consumption. Recipients should use their judgment when accepting food. We recommend checking expiration dates and the condition of food before consumption."
    },
    {
      question: "Can I donate anonymously?",
      answer: "Yes, you can choose to remain anonymous when making a donation. Your personal information will not be visible to recipients, but our system will still facilitate the connection for logistics purposes."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="faq-container" style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "0 1rem",
      }}>
        <motion.div
          className="faq-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ 
            background: "#1e293b", 
            padding: "2rem 2.5rem", 
            borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            border: "1px solid #334155",
            color: "#e2e8f0",
            textAlign: "center",
            marginBottom: "2rem"
          }}
        >
          <h2 style={{ 
            marginBottom: "1rem", 
            color: "#f8fafc",
            fontSize: "2rem",
            background: "linear-gradient(to right, #818cf8, #c7d2fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 20px rgba(129, 140, 248, 0.3)"
          }}>Frequently Asked Questions</h2>
          <p style={{ 
            color: "#94a3b8", 
            lineHeight: "1.6",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Find answers to common questions about donating and requesting food through our platform.
          </p>
        </motion.div>

        <motion.div
          className="faq-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ 
            background: "#1e293b", 
            padding: "2rem 2.5rem", 
            borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            border: "1px solid #334155",
            color: "#e2e8f0"
          }}
        >
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
              style={{
                borderBottom: index < faqItems.length - 1 ? "1px solid #334155" : "none",
                paddingBottom: "1rem",
                marginBottom: "1rem"
              }}
            >
              <div 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "0.75rem 0",
                  userSelect: "none"
                }}
              >
                <h3 style={{ 
                  color: openIndex === index ? "#a5b4fc" : "#e2e8f0", 
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  transition: "color 0.3s ease"
                }}>
                  {item.question}
                </h3>
                <div style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: openIndex === index ? "#4f46e5" : "#334155",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.3s ease, transform 0.3s ease",
                  transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)"
                }}>
                  <span style={{ color: "#fff", fontSize: "1.2rem", lineHeight: 1 }}>+</span>
                </div>
              </div>
              
              <motion.div
                className="faq-answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                style={{
                  overflow: "hidden",
                  paddingLeft: "0.5rem",
                  borderLeft: "2px solid #4f46e5"
                }}
              >
                <p style={{ 
                  color: "#94a3b8", 
                  lineHeight: "1.6",
                  padding: "0.75rem 0 0.5rem 0.75rem"
                }}>
                  {item.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="faq-contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ 
            background: "#1e293b", 
            padding: "1.5rem 2rem", 
            borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            border: "1px solid #334155",
            color: "#e2e8f0",
            textAlign: "center",
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h3 style={{ 
            color: "#a5b4fc", 
            marginBottom: "0.75rem",
            fontSize: "1.2rem"
          }}>Still have questions?</h3>
          <p style={{ 
            color: "#94a3b8", 
            marginBottom: "1.25rem",
            maxWidth: "500px"
          }}>
            If you couldn't find the answer to your question, feel free to reach out to our support team.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#4f46e5",
              color: "white",
              borderRadius: "0.5rem",
              textDecoration: "none",
              fontWeight: "500",
              boxShadow: "0 2px 10px rgba(79, 70, 229, 0.4)",
              transition: "background-color 0.3s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#4338ca"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#4f46e5"}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}