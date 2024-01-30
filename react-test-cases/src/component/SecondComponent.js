// AnotherComponent.js
import React, { useState } from 'react';

const SecondComponent = () => {

  const [showComponentSuccessMessage, setComponentShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setComponentShowSuccessMessage(true)
  };

  return (
    <div>
      <h2>SecondComponent</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Field 1:
          <input
            type="text"
            name="field1"
            value={formData.field1}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Field 2:
          <input
            type="text"
            name="field2"
            value={formData.field2}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Field 3:
          <input
            type="text"
            name="field3"
            value={formData.field3}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Field 4:
          <input
            type="text"
            name="field4"
            value={formData.field4}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Field 5:
          <input
            type="text"
            name="field5"
            value={formData.field5}
            onChange={handleInputChange}
          />
        </label>
        {showComponentSuccessMessage && (
          <div style={{ color: 'green' }}>
            Form submitted with data: {JSON.stringify(formData)}
          </div>
        )}
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SecondComponent;
