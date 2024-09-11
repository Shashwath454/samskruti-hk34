import React, { useState } from 'react';
import './NewEventModal.css'; // Create this CSS file for styling

function NewEventModal({ isOpen, onClose, onSave }) {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(eventDetails);
  };

  return (
    isOpen ? (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>×</button>
          <h2>Add New Event</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={eventDetails.title}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="date"
              placeholder="Event Date"
              value={eventDetails.date}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Event Description"
              value={eventDetails.description}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Event</button>
          </form>
        </div>
      </div>
    ) : null
  );
}

export default NewEventModal;
