// src/components/CulturalDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import heritageData from '../data/heritage.json';
import './CulturalDetails.css';


function CulturalDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const item = heritageData.find(h => h.id === parseInt(id));
    setDetails(item);
  }, [id]);

  if (!details) return <div>Loading...</div>;

  return (
    <div className="cultural-details">
      <h2>{details.name}</h2>
      <p><strong>Location:</strong> {details.location}</p>
      <p>{details.description}</p>

      {/* Image carousel */}
      <Carousel showThumbs={false} infiniteLoop autoPlay>
        {details.images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Heritage ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CulturalDetails;
