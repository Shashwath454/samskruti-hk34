import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/heritage');
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Preserving Cultural Heritage</h1>
        <p>Discover, Explore, and Learn about heritage sites across the world.</p>
        <button onClick={handleClick} className="hero-btn">Explore Now</button>
      </div>
    </section>
  );
}

export default Home;
