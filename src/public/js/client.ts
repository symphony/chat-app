import { Socket, ServerOptions } from 'socket.io'; // types

$(() => {
  // create main socket ie. not logged in
  const mainSocket = createSocket('/');
  let userSocket = mainSocket;
  const $mainHeader = $('body > header');
  const $chatform = $('body main #chat form')

  // = events =
  $mainHeader.find('#connect').on('submit', (e) => {
    e.preventDefault();
    const $input = $mainHeader.find('input');
    const username = $input?.val()?.toString().trim();

    // form validation
    if (!username) return;

    $input.val('');

    if (userSocket) userSocket.disconnect();
    userSocket = connect({ username });
  });

  $('body > header > #disconnect').on('click', () => {
    if (!userSocket) return;
    disconnect(userSocket);
    userSocket = mainSocket;
    $mainHeader.find('h1').text('Please Login');
  });

  $chatform.on('submit', (e) => {
    e.preventDefault();
    const $input = $chatform.find('input');
    const message = $input?.val()?.toString().trim();

    // form validation
    if (!userSocket || !message) return;

    $input.val('');
    userSocket.emit('send', message);
  });
});

// = helpers =
// @ts-ignore // visual bug - this line breaks compiler because it can't find 'io' from window even though it's there
const createSocket = (url: string, options?: ServerOptions): Server => io(options);

// = functions =
const connect = (data: {username: string}) => {
  const socket = createSocket('/users');

  socket.on('connect', () => {
    socket.emit('login', data, (e: Error | null, message: string) => {
      if (e) return console.error(e);
      updateHeader(`Hello, ${message}!`);
    });
  });

  socket.on('announce', (data: string) => {
    const $li = document.createElement('li');
    $li.appendChild(document.createTextNode(data));
    $('body > main > #announce > ul').prepend($li);
  });

  socket.on('notify', (data: string) => {
    const $div = document.createElement('div');
    $div.appendChild(document.createTextNode(data));
    $('body > header > #notify > ul').html($div);
  });

  socket.on('outgoing', (data: string) => {
    const $li = document.createElement('li');
    $li.appendChild(document.createTextNode(data));
    $li.classList.add('right')
    $('body > main > section#chat #chatbox ul').append($li);
  });

  socket.on('incoming', (data: string) => {
    const $li = document.createElement('li');
    $li.appendChild(document.createTextNode(data));
    $('body > main > section#chat #chatbox ul').append($li);
  });

  return socket;
};

const disconnect = (socket: Socket) => {
  console.log('Disconnected from server\n');
  socket.disconnect();
};


const updateHeader = (text: string) => {
  const $mainHeader = $('header')
  $mainHeader.find('h1').html(document.createTextNode(text));
};

