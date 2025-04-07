import React, { useEffect, useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PortfolioForm from "./PortfolioForm";
import PortfolioView from "./PortfolioView";
import './App.css';
import { FaGoogle } from 'react-icons/fa';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const login = async () => {
    if (auth.currentUser || loading) return;
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      // User state is automatically updated by onAuthStateChanged
    } catch (err) {
      if (err.code === "auth/cancelled-popup-request") {
        console.warn("Popup request was cancelled.");
      } else if (err.code === "auth/popup-closed-by-user") {
        alert("Login popup was closed. Please try again.");
      } else {
        console.error("Login error:", err);
        alert("Login failed: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  

  const logout = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        <h1>🚀 Dynamic Portfolio Manager</h1>
        {user ? (
          <>
            <p>👋 Welcome, {user.displayName}</p>
            <button onClick={logout}>Logout</button>
            <Routes>
              <Route path="/" element={<Navigate to="/portfolio" />} />
              <Route path="/portfolio" element={<PortfolioView user={user} />} />
              <Route path="/edit" element={<PortfolioForm user={user} />} />
            </Routes>
          </>
        ) : (
          <button onClick={login} disabled={loading}>
            {loading ? "Logging in..." : <><FaGoogle /> Login with Google</>}
          </button>
        )}
      </div>
    </Router>
  );
}

export default App;