$(() => {
  let socket = null;

  // = events =
  $('body > header > #connect').on('submit', function(e) {
    e.preventDefault();

    $form = $(this).find('input');
    const username = $form.val().trim();
    if (socket || !username) return;
    $form.val('');

    socket = connect({ username });
  });

  $('body > header > #disconnect').on('click', () => {
    if (!socket) return;
    disconnect(socket);
    socket = null;
  });
});

// functions
const connect = (data) => {
  const socket = io(data);

  socket.on('connect', (e) => {
    socket.emit('name', data);
    console.log('Joined as:', data.username);
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
