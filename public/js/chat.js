//- we have acces to io() , trhrought the socket.io script on the client side .
const socket = io();

//* sendMessage event :
document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();

  const message = e.target.elements.message.value;

  socket.emit('sendMessage', message, (error) => {
    if (error) {
      return console.log(error);
    }

    console.log('The message was delivered');
  });
});

socket.on('message', (message) => {
  console.log(message);
});

//* sendLocation event :
document.querySelector('#sendLocation').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      'sendLocation',
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        console.log('Location shared');
      }
    );
  });
});
