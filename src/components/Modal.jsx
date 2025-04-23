import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ show, onClose, children }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000
          }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "#1e293b",
              borderRadius: "1rem",
              padding: "2rem",
              minWidth: "300px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              border: "1px solid #334155",
              color: "#e2e8f0"
            }}
            onClick={e => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}