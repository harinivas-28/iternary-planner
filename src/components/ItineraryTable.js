import React, { useState } from 'react';
import axios from 'axios';

function ItineraryTable({ itineraries, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [totalExpenses, setTotalExpenses] = useState(0);

  const handleTotalButtonClick = async () => {
    try {
      const response = await axios.get('http://localhost:5000/totalExpenses');
      setTotalExpenses(response.data.totalExpenses);
    } catch (error) {
      console.error('Error fetching total expenses:', error);
      window.alert('Failed to fetch total expenses. Please try again.');
    }
  };
  const handleEditClick = (itinerary) => {
    setEditingId(itinerary._id); // Set the row to be editable
    setEditFormData(itinerary); // Pre-fill the form with the selected itinerary data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveClick = async () => {
    await onUpdate(editingId, editFormData); // Call the onUpdate function passed as a prop
    setEditingId(null); // Exit edit mode
  };

  const handleCancelClick = () => {
    setEditingId(null); // Exit edit mode without saving
  };

  return (
    <>
    <table className="table table-striped mt-4">
      <thead>
        <tr>
          <th>Destination</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Expenses</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {itineraries.map((itinerary, index) => (
          <tr key={index} id={`row${index + 1}`}>
            {editingId === itinerary._id ? (
              // Editable row
              <>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="destination"
                    value={editFormData.destination}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={editFormData.startDate}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={editFormData.endDate}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    name="expenses"
                    value={editFormData.expenses}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <button className="btn btn-success btn-sm me-2" onClick={handleSaveClick}>
                    Save
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={handleCancelClick}>
                    Cancel
                  </button>
                </td>
              </>
            ) : (
              // Non-editable row
              <>
                <td>{itinerary.destination}</td>
                <td>{new Date(itinerary.startDate).toLocaleDateString()}</td>
                <td>{new Date(itinerary.endDate).toLocaleDateString()}</td>
                <td>${itinerary.expenses}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditClick(itinerary)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(itinerary._id)}
                  >
                    Delete
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    <div className="mt-3">
      <button className="btn btn-primary" onClick={handleTotalButtonClick}>Get Total Expenses</button>
      {totalExpenses > 0 && (
        <div className="mt-3">
          <h5>Total Expenses: ${totalExpenses}</h5>
        </div>
      )}
    </div>
    </>
  );
}

export default ItineraryTable;



