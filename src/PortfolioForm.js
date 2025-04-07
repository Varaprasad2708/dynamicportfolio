import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function PortfolioForm({ user }) {
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    skills: "",
    projects: "",
    resume: "",
    github: "",
    certifications: "",
    contact: "",
    location: "",
    domain: ""
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "portfolios", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "portfolios", user.uid), formData);
    alert("Portfolio saved!");
    navigate("/portfolio");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <textarea name="about" placeholder="About" value={formData.about} onChange={handleChange} />
      <input name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange} />
      <input name="domain" placeholder="Interested Domain (e.g. AI, Web Dev)" value={formData.domain} onChange={handleChange} />
      <input name="projects" placeholder="Projects" value={formData.projects} onChange={handleChange} />
      <input name="resume" placeholder="Resume Link" value={formData.resume} onChange={handleChange} />
      <input name="github" placeholder="GitHub Link" value={formData.github} onChange={handleChange} />
      <input name="certifications" placeholder="Certifications (links or names)" value={formData.certifications} onChange={handleChange} />
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
      <input name="contact" placeholder="Contact Info (email/phone)" value={formData.contact} onChange={handleChange} />
      <button type="submit">Save Portfolio</button>
    </form>
  );
}

export default PortfolioForm;