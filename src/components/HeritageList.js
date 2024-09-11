import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import heritageData from '../data/heritage.json';
import NewEventModal from './NewEventModal'; // Import the NewEventModal component
import './HeritageList.css';

Modal.setAppElement('#root');

const ITEMS_PER_PAGE = 6;

function HeritageList() {
  const [heritage, setHeritage] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false); // For "Know More" modal
  const [newEventModalIsOpen, setNewEventModalIsOpen] = useState(false); // For "Publish New Event" modal
  const [selectedHeritage, setSelectedHeritage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    setTimeout(() => {
      setHeritage(heritageData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  // Open the modal for viewing details
  const openDetailModal = (heritageItem) => {
    setSelectedHeritage(heritageItem);
    setDetailModalIsOpen(true);
  };

  // Close the details modal
  const closeDetailModal = () => {
    setDetailModalIsOpen(false);
    setSelectedHeritage(null);
  };

  // Open the modal for publishing a new event
  const openNewEventModal = () => {
    setNewEventModalIsOpen(true);
  };

  // Close the new event modal
  const closeNewEventModal = () => {
    setNewEventModalIsOpen(false);
  };

  // Handle the submission of a new event
  const handleNewEvent = (eventDetails) => {
    console.log('New event details:', eventDetails);
    // Add logic to handle the new event, like saving to a database
    closeNewEventModal();
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const filteredHeritage = heritage.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    item.location.toLowerCase().includes(searchTerm)
  );
  const currentItems = filteredHeritage.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHeritage.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="heritage-list-section" id="heritage-list">
      <div className="button-container">
        <button onClick={() => navigate('/')} className="go-back-btn">Go Back</button>
        <button onClick={openNewEventModal} className="publish-event-btn">Publish New Event</button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search heritage sites..."
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>

      {loading ? (
        <div className="loader">
          <ClipLoader color={"#005f73"} loading={loading} size={50} />
        </div>
      ) : (
        <>
          <div className="card-container">
            {currentItems.map(item => (
              <div className="heritage-card" key={item.id}>
                <div className="card-content">
                  <h3>{item.name}</h3>
                  <p>{item.location}</p>
                  <p>{item.description.slice(0, 100)}...</p> {/* Shortened description */}
                  <p><strong>Date:</strong> {item.date}</p>
                  <button onClick={() => openDetailModal(item)} className="know-more-btn">Know More</button>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Modal for selected heritage details */}
          {selectedHeritage && (
            <Modal
              isOpen={detailModalIsOpen}
              onRequestClose={closeDetailModal}
              contentLabel="Heritage Details"
              className="heritage-modal"
            >
              <h2>{selectedHeritage.name}</h2>
              <p><strong>Location:</strong> {selectedHeritage.location}</p>
              <p>{selectedHeritage.description}</p>
              <button onClick={closeDetailModal}>Close</button>
            </Modal>
          )}

          {/* Modal for adding a new event */}
          <NewEventModal
            isOpen={newEventModalIsOpen}
            onClose={closeNewEventModal}
            onSave={handleNewEvent}
          />
        </>
      )}
    </div>
  );
}

export default HeritageList;
