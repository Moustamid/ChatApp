//-core
const path = require('path');
//-npm
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const chalk = require('chalk');

// SECTION:

const app = express();
const server = http.createServer(app);
//*  our server now support web socket.io  :
const io = socketio(server);

// SECTION:

const publicDirectoryPath = path.join(__dirname, '../public');

// SECTION:

app.use(express.static(publicDirectoryPath));

// SECTION: socket.io :

io.on('connection', (socket) => {
  console.log(chalk.hex('#f7ca18').bold(`New WebSocket connection 🛸 ...  `));

  socket.emit('message', 'Welcome');
  socket.broadcast.emit('message', 'A new user has joined');

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left');
  });
});

// SECTION:

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(
    chalk.hex('#26a65b').bold(`Express Server running on port ${PORT} ...👩‍💻`)
  );
});
