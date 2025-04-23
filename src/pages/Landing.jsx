import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Landing.css";

export default function Landing() {
  // Refs for scroll animations
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Animation controls
  const heroControls = useAnimation();
  const statsControls = useAnimation();
  const featuresControls = useAnimation();
  const howItWorksControls = useAnimation();
  const testimonialsControls = useAnimation();
  const ctaControls = useAnimation();
  
  // Check if elements are in view
  const heroInView = useInView(heroRef, { once: true, threshold: 0.1 });
  const statsInView = useInView(statsRef, { once: true, threshold: 0.1 });
  const featuresInView = useInView(featuresRef, { once: true, threshold: 0.1 });
  const howItWorksInView = useInView(howItWorksRef, { once: true, threshold: 0.1 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, threshold: 0.1 });
  const ctaInView = useInView(ctaRef, { once: true, threshold: 0.1 });
  
  // Trigger animations when elements come into view
  useEffect(() => {
    if (heroInView) {
      heroControls.start("visible");
    }
    if (statsInView) {
      statsControls.start("visible");
    }
    if (featuresInView) {
      featuresControls.start("visible");
    }
    if (howItWorksInView) {
      howItWorksControls.start("visible");
    }
    if (testimonialsInView) {
      testimonialsControls.start("visible");
    }
    if (ctaInView) {
      ctaControls.start("visible");
    }
  }, [heroInView, statsInView, featuresInView, howItWorksInView, testimonialsInView, ctaInView]);

  // Stats data
  const stats = [
    { value: "10,000+", label: "Meals Shared" },
    { value: "500+", label: "Active Donors" },
    { value: "50+", label: "Communities" },
    { value: "0", label: "Food Wasted" }
  ];

  // Features data
  const features = [
    {
      icon: "🔄",
      title: "Easy Donations",
      description: "List your surplus food in seconds and connect with those who need it most."
    },
    {
      icon: "🔍",
      title: "Find Food",
      description: "Browse available donations near you and request what you need."
    },
    {
      icon: "📱",
      title: "Real-time Updates",
      description: "Get notifications about donation status and pickup arrangements."
    },
    {
      icon: "🤝",
      title: "Community Building",
      description: "Connect with neighbors and build stronger, more resilient communities."
    }
  ];

  // How it works steps
  const steps = [
    {
      number: "01",
      title: "Sign Up",
      description: "Create your free account in seconds to get started.",
      color: "#4f46e5"
    },
    {
      number: "02",
      title: "List or Browse",
      description: "Add your donation or browse available food in your area.",
      color: "#7c3aed"
    },
    {
      number: "03",
      title: "Connect",
      description: "Arrange pickup or delivery through our secure messaging.",
      color: "#8b5cf6"
    },
    {
      number: "04",
      title: "Share",
      description: "Complete the donation and help reduce food waste.",
      color: "#a78bfa"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "FoodShare has transformed how our restaurant handles surplus food. Instead of throwing it away, we're feeding people in need.",
      author: "Sarah J.",
      role: "Restaurant Owner"
    },
    {
      quote: "As a single parent, FoodShare has been a lifesaver during tough times. The community support is incredible.",
      author: "Michael T.",
      role: "Food Recipient"
    },
    {
      quote: "I've met amazing neighbors through donating on this platform. It's about more than just food—it's about community.",
      author: "Priya K.",
      role: "Regular Donor"
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.3 } }
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
          >
            Share Food, <span className="text-gradient">Reduce Waste</span>, Build Community
          </motion.h1>
          
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
            }}
          >
            Connect with neighbors to share surplus food and reduce waste in your community. 
            Together, we can ensure no good food goes to waste and no one goes hungry.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } }
            }}
          >
            <Link to="/donate" className="btn btn-primary">
              Donate Food
            </Link>
            <Link to="/request" className="btn btn-secondary">
              Find Food
            </Link>
          </motion.div>
          
          <motion.div 
            className="hero-scroll-indicator"
            animate={{ 
              y: [0, 10, 0], 
              opacity: [0.6, 1, 0.6] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2 
            }}
          >
            <span>Scroll to learn more</span>
            <div className="scroll-arrow">↓</div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Stats Section */}
      <motion.section 
        className="stats-section"
        ref={statsRef}
        initial="hidden"
        animate={statsControls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
        }}
      >
        <div className="stats-container">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="stat-item"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* Features Section */}
      <motion.section 
        className="features-section"
        ref={featuresRef}
        initial="hidden"
        animate={featuresControls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } }
        }}
      >
        <motion.h2 
          className="section-title"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          Why Use <span className="text-gradient">FoodShare</span>?
        </motion.h2>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.5, 
                    delay: index * 0.1 
                  } 
                }
              }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)"
              }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* How It Works Section */}
      <motion.section 
        className="how-it-works-section"
        ref={howItWorksRef}
        initial="hidden"
        animate={howItWorksControls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } }
        }}
      >
        <motion.h2 
          className="section-title"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          How It <span className="text-gradient">Works</span>
        </motion.h2>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="step-card"
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
                visible: { 
                  opacity: 1, 
                  x: 0, 
                  transition: { 
                    duration: 0.5, 
                    delay: index * 0.15 
                  } 
                }
              }}
            >
              <div 
                className="step-number" 
                style={{ backgroundColor: step.color }}
              >
                {step.number}
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* Testimonials Section */}
      <motion.section 
        className="testimonials-section"
        ref={testimonialsRef}
        initial="hidden"
        animate={testimonialsControls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } }
        }}
      >
        <motion.h2 
          className="section-title"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          What People <span className="text-gradient">Say</span>
        </motion.h2>
        
        <div className="testimonials-wrapper">
          <div className="testimonials-background">
            <div className="testimonials-blob"></div>
            <div className="testimonials-blob"></div>
          </div>
          
          <div className="testimonials-container">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="testimonial-card"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.5, 
                      delay: index * 0.2 
                    } 
                  }
                }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                  borderColor: "#4f46e5"
                }}
              >
                <div className="testimonial-avatar">
                  <div className="avatar-circle">
                    {testimonial.role === "Restaurant Owner" ? "🍽️" : 
                     testimonial.role === "Food Recipient" ? "🙏" : "🤝"}
                  </div>
                </div>
                <div className="quote-mark">"</div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.role}</p>
                </div>
                <div className="testimonial-rating">
                  {"★".repeat(5)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* CTA Section */}
      <motion.section 
        className="cta-section"
        ref={ctaRef}
        initial="hidden"
        animate={ctaControls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8 } }
        }}
      >
        <div className="cta-container">
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            Ready to Make a <span className="text-gradient">Difference</span>?
          </motion.h2>
          
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
            }}
          >
            Join our community today and be part of the solution to food waste and hunger.
          </motion.p>
          
          <motion.div 
            className="cta-buttons"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
            }}
          >
            <Link to="/donate" className="btn btn-primary">
              Start Donating
            </Link>
            <Link to="/about" className="btn btn-outline">
              Learn More
            </Link>
          </motion.div>
        </div>
      </motion.section>
      
      <Footer />
    </>
  );
}