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
//- our server now support web socket.io
const io = socketio(server);

// SECTION:

const publicDirectoryPath = path.join(__dirname, '../public');

// SECTION:

app.use(express.static(publicDirectoryPath));

// SECTION:

io.on('connection', () => {
  console.log(chalk.hex('#8c14fc').bold(` New WebSocket connection`));
});

// SECTION:

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(
    chalk.hex('#26a65b').bold(`Express Server running on port ${PORT} ...👩‍💻`)
  );
});
