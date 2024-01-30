// ChatBot.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ConvertText from './ConvertText';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/user/chatbot', {
        prompt: input,
      });

      const botReply = response.data.data;
      const botMessage = { text: <ConvertText text={botReply} />, sender: 'bot' };

      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error fetching bot reply:', error);
    } finally {
      setLoading(false);
    }

    setInput('');
  };

  return (
    <div className="chat-container">
      <ul className="messages">
        {messages ? (
          messages.map((message, index) => (
            <li
              key={index}
              className={`message ${message.sender}`}
              style={{
                marginLeft: message.sender === 'user' ? '0' : '50%',
              }}
            >
              <span className="sender">{message.sender === 'user' ? '' : ''}</span>
              {message.text}
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
      <form onSubmit={handleSendMessage}>
        <div className="input-box">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message"
            className="message-input"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </div>
      </form>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ChatBot;
