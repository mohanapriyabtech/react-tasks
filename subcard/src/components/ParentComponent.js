import React, { useEffect,useState } from 'react';
import io from 'socket.io-client';
import ChildComponent from './ChildComponent'; // Assuming your ChildComponent file is imported

const ParentComponent = () => {
  const fieldNames = ['Title', 'Description', 'Selected Option', 'URL'];
  const [inputValues, setInputValues] = useState(['', '', '', '']);

  // Connect to the socket server
  const socket = io(process.env.REACT_APP_API_URL);

  useEffect(() => {
    // ComponentDidMount: Connect to the socket server
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    // Handle connection errors
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    // ComponentWillUnmount: Disconnect when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []); 

  // Function to emit typing event and update inputValues
  const handleInputChange = (index, value) => {
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;

      // Emit the event to update child components
      socket.emit('updateInputValues', {
        title: newValues[0],
        description: newValues[1],
        option: newValues[2],
        url: newValues[3]
      });

      return newValues;
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '20px' }}>
        <h2>Parent Component</h2>
        {inputValues.map((value, index) => (
          <div key={index}>
            <label>{`${fieldNames[index]}: `}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <ChildComponent inputValues={inputValues} />
    </div>
  );
};

export default ParentComponent;
