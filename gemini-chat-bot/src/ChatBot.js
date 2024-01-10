// ChatBot.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ConvertText from './ConvertText';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Display user's message
    const userMessage = { text: input, sender: 'user' };

    try {
      // Replace this URL with the actual endpoint of your chatbot API
      const response = await axios.post('http://localhost:5000/chatbot', {
        prompt: input,
      });

      // Assume the API response contains the bot's reply
      const botReply = response.data.botReply;

      // Display bot's reply using ConvertText component
      const botMessage = { text: <ConvertText text={botReply} />, sender: 'bot' };

      // Combine user and bot messages into a single array
      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error fetching bot reply:', error);
    }

    setInput(''); // Reset the input after sending the user's message if needed
  };

  return (
    <div className="chat-container">
      <ul className="messages">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`message ${message.sender}`}
            style={{
              marginLeft: message.sender === 'user' ? '0' : '50%',
              transform: message.sender === 'user' ? 'translateX(0)' : 'translateX(50%)',
            }}
            
          >
            <span className="sender">{message.sender === 'user' ? '' : ''}</span>
            {message.sender === 'bot' ? (
              message.text
            ) : (
              message.text
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
        <div className="input-box">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message"
            className="message-input"
          />
          <button onClick={handleSendMessage} className="send-button">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
