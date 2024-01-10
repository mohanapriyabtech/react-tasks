import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChildComponent = () => {
  const [childInputValues,  setChildInputValues] = useState({});

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

  useEffect(() => {
    // Listen for the event to update childInputValues
    socket.on('updateInputValues', (data) => {
      console.log(data,"data")
      setChildInputValues(data);
    });
    console.log(childInputValues,"childInputValues")

    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off('updateInputValues');
    };
  }, [socket]);

  return (
    <div style={{ marginLeft: '20px' }}>
      <h2>Child Component</h2>
      {childInputValues ? (
        <div>
          {childInputValues.title && (
            <div>
              <label>Title:</label>
              <input type="text" value={childInputValues.title} readOnly />
            </div>
          )}
          {childInputValues.option && (
            <div>
              <label>Select Option:</label>
              <input type="text" value={childInputValues.option} readOnly />
            </div>
          )}
          {childInputValues.description && (
            <div>
              <label>Description:</label>
              <input type="text" value={childInputValues.description} readOnly />
            </div>
          )}
          {childInputValues.url && (
            <div>
              <label>URL:</label>
              <input type="text" value={childInputValues.url} readOnly />
            </div>
          )}
        </div>
      ) : (
        <div>
          <label>No data available</label>
        </div>
      )}
    </div>
  );
}  

export default ChildComponent;
