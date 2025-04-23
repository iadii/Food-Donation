import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="toast"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            background: "#4f46e5",
            color: "#fff",
            padding: "1rem 2rem",
            borderRadius: "1rem",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            zIndex: 3000,
            border: "1px solid #6366f1"
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}