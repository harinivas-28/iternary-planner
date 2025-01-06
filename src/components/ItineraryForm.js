import React, { useState } from 'react';

function ItineraryForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    expenses: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Submit the form data
    // Reset form after submission
    setFormData({ destination: '', startDate: '', endDate: '', expenses: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h3>Create New Itinerary</h3>
      <div className="mb-3">
        <label className="form-label">Destination</label>
        <input
          type="text"
          className="form-control"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Start Date</label>
        <input
          type="date"
          className="form-control"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">End Date</label>
        <input
          type="date"
          className="form-control"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Expenses</label>
        <input
          type="number"
          className="form-control"
          name="expenses"
          value={formData.expenses}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
}

export default ItineraryForm;
