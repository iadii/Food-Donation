import React from "react";
import { motion } from "framer-motion";
import "./Footer.css";

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="footer-content">
        <div className="footer-logo">
          <span className="logo-icon">🍲</span>
          <span className="logo-text">FoodShare</span>
        </div>
        
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} FoodShare. All rights reserved.</div>
          <div className="made-with-love">
            Made with <span className="heart">❤️</span> for the community
          </div>
        </div>
      </div>
    </motion.footer>
  );
}