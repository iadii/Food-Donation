import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Donate from "./pages/Donate";
import Request from "./pages/Request";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Profile from "./pages/Profile";
import { AppContext } from "./context/AppContext";
import { getData } from "./utils/localStorage";
import "./App.css";

function App() {
  const [user, setUser] = useState(getData("user") || null);
  const [donations, setDonations] = useState(getData("donations") || []);
  const [requests, setRequests] = useState(getData("requests") || []);

  useEffect(() => {
    // Update state when localStorage changes
    const updateData = () => {
      setDonations(getData("donations") || []);
      setRequests(getData("requests") || []);
      setUser(getData("user") || null);
    };
    
    window.addEventListener("storage", updateData);
    return () => window.removeEventListener("storage", updateData);
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, donations, requests }}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/request" element={<Request />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
