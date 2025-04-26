import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Donate", href: "/donate" },
  { name: "Request", href: "/request" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
  { name: "Profile", href: "/profile" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="navbar-container">
        <motion.div 
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <span className="logo-icon">🍲</span> 
          <span className="logo-text">FoodShare</span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <ul className="navbar-links desktop-nav">
          {navLinks.map((link, idx) => (
            <motion.li
              key={link.name}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a href={link.href}>{link.name}</a>
            </motion.li>
          ))}
        </ul>
        
        {/* Mobile Menu Button */}
        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul>
              {navLinks.map((link, idx) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <a href={link.href} onClick={() => setMobileMenuOpen(false)}>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}