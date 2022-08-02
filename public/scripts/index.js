$(() => {
  let socket = null;

  // = events =
  $('body > header > #connect').on('click', () => {
    if (socket) return;
    socket = connect();
  });

  $('body > header > #disconnect').on('click', () => {
    if (!socket) return;
    disconnect(socket);
    socket = null;
  });
});

// functions
const connect = () => {
  const socket = io();

  socket.on('connect', (e) => {
    console.log('Joined as:', socket.id);
  });

  socket.on('announce', (data) => {
    $li = document.createElement('li');
    $li.appendChild(document.createTextNode(data));
    $('body > main > #announce > ul').prepend($li);
  });

  socket.on('notify', (data) => {
    $div = document.createElement('div');
    $div.appendChild(document.createTextNode(data));
    $('body > main > #notify > ul').html($div);
  });

  return socket;
};

const disconnect = (socket) => {
  console.log('Disconnected from server\n');
  socket.disconnect();
};
