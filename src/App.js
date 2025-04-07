import React, { useEffect, useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PortfolioForm from "./PortfolioForm";
import PortfolioView from "./PortfolioView";
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        <h1>Dynamic Portfolio Manager</h1>
        {user ? (
          <>
            <p>Welcome, {user.displayName}</p>
            <button onClick={logout}>Logout</button>
            <Routes>
              <Route path="/" element={<Navigate to="/portfolio" />} />
              <Route path="/portfolio" element={<PortfolioView user={user} />} />
              <Route path="/edit" element={<PortfolioForm user={user} />} />
            </Routes>
          </>
        ) : (
          <button onClick={login}>Login with Google</button>
        )}
      </div>
    </Router>
  );
}

export default App; 