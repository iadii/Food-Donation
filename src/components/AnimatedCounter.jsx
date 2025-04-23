import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedCounter({ label, end }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [end]);
  return (
    <motion.div
      className="counter"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="count">{count}</span>
      <span className="label">{label}</span>
    </motion.div>
  );
}