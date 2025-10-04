const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST']
  }
});

let chatHistory = []; 
let onlineUsers = new Set(); 

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (username) => {
    if (onlineUsers.has(username)) {
      socket.emit('error', 'Username is already taken');
      return;
    }
    socket.username = username;
    onlineUsers.add(username);
    io.emit('onlineUsers', Array.from(onlineUsers));
    console.log(`${username} joined`);
  });

  socket.on('message', (text) => {
    if (!socket.username) {
      socket.emit('error', 'Must join with a username first');
      return;
    }
    const message = {
      user: socket.username,
      text,
      timestamp: Date.now()
    };
    chatHistory.push(message);
    if (chatHistory.length > 50) {
      chatHistory.shift(); 
    }
    io.emit('message', message);
    console.log(`Message from ${socket.username}: ${text}`);
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      onlineUsers.delete(socket.username);
      io.emit('onlineUsers', Array.from(onlineUsers));
      console.log(`${socket.username} disconnected`);
    }
  });
});


app.get('/history', (req, res) => {
  res.json(chatHistory);
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});