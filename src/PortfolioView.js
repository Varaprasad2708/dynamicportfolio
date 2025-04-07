import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function PortfolioView({ user }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "portfolios", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        // Redirect to create form if no portfolio exists
        navigate("/edit");
      }
      setLoading(false);
    };
    fetchData();
  }, [user, navigate]);
  

  if (loading) return <p>Loading portfolio...</p>;

  return (
    <div className="portfolio-display">
      <h2>{data.name}'s Portfolio</h2>
      <p><strong>About:</strong> {data.about}</p>
      <p><strong>Skills:</strong> {data.skills}</p>
      <p><strong>Interested Domain:</strong> {data.domain}</p>
      <p><strong>Projects:</strong> {data.projects}</p>
      <p><strong>Resume:</strong> <a href={data.resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>
      <p><strong>GitHub:</strong> <a href={data.github} target="_blank" rel="noopener noreferrer">{data.github}</a></p>
      <p><strong>Certifications:</strong> {data.certifications}</p>
      <p><strong>Location:</strong> {data.location}</p>
      <p><strong>Contact:</strong> {data.contact}</p>
      <button onClick={() => navigate("/edit")}>Edit Info</button>
    </div>
  );
}

export default PortfolioView;