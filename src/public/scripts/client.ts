import { Socket } from 'socket.io'; // types

$(() => {
  // @ts-ignore
  let socket: null | Socket = io();
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

    if (socket) socket.disconnect();
    socket = connect({ username });
  });

  $('body > header > #disconnect').on('click', () => {
    if (!socket) return;
    disconnect(socket);
    socket = null;
    $mainHeader.find('h1').text('Please Login');
  });

  $chatform.on('submit', (e) => {
    e.preventDefault();
    const $input = $chatform.find('input');
    const message = $input?.val()?.toString().trim();

    // form validation
    if (!socket || !message) return;

    $input.val('');
    socket.emit('send', message);
  });
});

// functions
const connect = (data: User) => {
  // @ts-ignore // visual bug - this line breaks compiler because it can't find 'io' from window even though it's there
  const socket = io();

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
    const $div = document.createElement('div');
    $div.appendChild(document.createTextNode(data));
    $div.classList.add('right')
    $('body > main > section#chat #chatbox ul').append($div);
  });

  socket.on('incoming', (data: string) => {
    const $div = document.createElement('div');
    $div.appendChild(document.createTextNode(data));
    $('body > main > section#chat #chatbox ul').append($div);
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

