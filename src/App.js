import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItineraryForm from './components/ItineraryForm';
import ItineraryTable from './components/ItineraryTable';

function App() {
  const [itineraries, setItineraries] = useState([]);

  // Fetch all itineraries
  const fetchItineraries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/itineraries');
      setItineraries(response.data);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
    }
  };

  // Create a new itinerary
  const handleCreate = async (formData) => {
    try {
      await axios.post('http://localhost:5000/api/itineraries', formData);
      fetchItineraries(); // Refresh the table
      window.alert('Itinerary added successfully!'); // Alert message
    } catch (error) {
      console.error('Error creating itinerary:', error);
      window.alert('Failed to add itinerary. Please try again.'); // Error alert
    }
  };

  // Update an itinerary
  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/itineraries/${id}`, updatedData);
      fetchItineraries(); // Refresh the table
      window.alert('Itinerary updated successfully!'); // Alert message
    } catch (error) {
      console.error('Error updating itinerary:', error);
      window.alert('Failed to update itinerary. Please try again.'); // Error alert
    }
  };

  // Delete an itinerary
  const handleDelete = async (id) => {
    try {
      const isConfirmed = window.confirm('Are you sure you want to delete this itinerary?');
      if (isConfirmed) {
        await axios.delete(`http://localhost:5000/api/itineraries/${id}`);
        fetchItineraries();
        window.alert('Itinerary deleted successfully!'); // Alert message
      }
    } catch (error) {
      console.error('Error deleting itinerary:', error);
      window.alert('Failed to delete itinerary. Please try again.'); // Error alert
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Travel Planner</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/create">Add Itinerary</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <ItineraryTable
                itineraries={itineraries}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            }
          />
          <Route
            path="/create"
            element={<ItineraryForm onSubmit={handleCreate} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

