import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './App.css'; 

const SOCKET_SERVER_URL = 'http://localhost:3000';
const HISTORY_API_URL = `${SOCKET_SERVER_URL}/history`;

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    
    const fetchHistory = async () => {
      try {
        const response = await axios.get(HISTORY_API_URL);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();

    
    socketRef.current = io(SOCKET_SERVER_URL);

    socketRef.current.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socketRef.current.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    socketRef.current.on('error', (msg) => {
      alert(msg);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleJoin = () => {
    if (username.trim()) {
      socketRef.current.emit('join', username);
      setJoined(true);
    }
  };

  const handleSend = () => {
    if (input.trim() && joined) {
      socketRef.current.emit('message', input);
      setInput('');
    }
  };

  return (
    <div className="app">
      {!joined ? (
        <div className="join-section">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleJoin}>Join Chat</button>
        </div>
      ) : (
        <div className="chat-section">
          <div className="online-users">
            <h3>Online Users ({onlineUsers.length})</h3>
            <ul>
              {onlineUsers.map((user) => (
                <li key={user}>{user}</li>
              ))}
            </ul>
          </div>
          <div className="chat-history">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                <strong>{msg.user}</strong>: {msg.text} <em>({new Date(msg.timestamp).toLocaleTimeString()})</em>
              </div>
            ))}
          </div>
          <div className="input-section">
            <input
              type="text"
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;