// src/components/Header.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

function Header() {



  return (
    <header className="site-header">
      <div className="container">
        <div className="logo">
          <Link to="/">SAMSKRUTI</Link>
        </div>
        
    
        
      </div>
     
    </header>
  );
}

export default Header;
