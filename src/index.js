//-core
const path = require('path');
//-npm
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');
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
  console.log(chalk.hex('#4d05e8').bold(`New WebSocket connection 🛸 ...  `));

  //* message event :
  socket.emit('message', 'Welcome');

  //* broadcast event :
  socket.broadcast.emit('message', 'A new user has joined');

  //* sendMessage event :
  socket.on('sendMessage', (message, callback) => {
    //.Checking for bad-worlds :
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }

    io.emit('message', message);
    callback();
  });

  //* disconnect event :
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left');
  });

  //* sendLocation event :
  socket.on('sendLocation', (coords, callback) => {
    io.emit(
      'message',
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );

    callback();
  });
});

// SECTION:

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(
    chalk.hex('#26a65b').bold(`Express Server running on port ${PORT} ...👩‍💻`)
  );
});
