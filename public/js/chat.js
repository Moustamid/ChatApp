//- we have acces to io() , trhrought the socket.io script on the client side .
const socket = io();

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();

  const message = e.target.element.message.value;

  socket.emit('sendMessage', message);
});

socket.on('message', (message) => {
  console.log(message);
});
