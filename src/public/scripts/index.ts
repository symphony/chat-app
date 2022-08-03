$(() => {
  let socket = null;
  const $mainHeader = $('body > header');

  // = events =
  $mainHeader.find('#connect').on('submit', (e) => {
    e.preventDefault();
    $form = $mainHeader.find('input');
    const username = $form.val().trim();

    // form validation
    if (socket || !username) return;

    $form.val('');

    $mainHeader.find('h1').html(document.createTextNode(`Hello, ${username}!`));
    socket = connect({ username });
  });

  $('body > header > #disconnect').on('click', () => {
    if (!socket) return;
    disconnect(socket);
    socket = null;
    $mainHeader.find('h1').text('Please Login');
  });
});

// functions
const connect = (data) => {
  const socket = io();

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
