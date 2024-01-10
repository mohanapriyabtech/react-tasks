import React from 'react';
import './ConvertText.css'; // Import a separate CSS file for styling

const ConvertText = ({ text }) => {
  const lines = text.split('\n');

  return (
    <div className="convert-text-container">
      {console.log(text, "api response")}
      {lines.map((line, index) => (
        <div key={index} className="text-line">
          {line}
        </div>
      ))}
    </div>
  );
};

export default ConvertText;