import React, { useState } from 'react';

const SimpleForm = () => {

  // State to manage form data and success message
  const [formData, setFormData] = useState({
    inputValue: '',
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      inputValue: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform actions with the form data here

    // Update state to show success message
    setShowSuccessMessage(true);
  };

  return (
    <div>
      <h2>Simple Form</h2>
      
      <form onSubmit={handleSubmit}>
        <label>
          Enter something:
          <input
            type="text"
            value={formData.inputValue}
            onChange={handleInputChange}
          />
        </label>

        <br />
        <button type="submit">Submit</button>

        {/* Conditionally render success message */}
        {showSuccessMessage && (
          <div style={{ color: 'green' }}>
            Form submitted with data: {JSON.stringify(formData)}
          </div>
        )}
      </form>
    </div>
  );
};

export default SimpleForm;
