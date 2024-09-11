// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HeritageList from './components/HeritageList';
import CulturalDetails from './components/CulturalDetails';
import Home from './components/Home';
 // Import About component
  // Import Contact component
import Header from './components/Header';
 // Ensure this is correctly implemented
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

// This component checks if the current path matches the ones where you want to hide the header
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const hideHeaderPaths = ['/heritage']; // Add more paths if needed

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      {children}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/heritage" element={<HeritageList />} />
              <Route path="/cultural/:id" element={<CulturalDetails />} />
              
            </Routes>
          </LayoutWrapper>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
