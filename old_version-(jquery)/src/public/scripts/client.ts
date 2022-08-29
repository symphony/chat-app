import { Socket, ServerOptions } from 'socket.io'; // types

$(() => {
  // Initialize materialize-css
  // @ts-ignore // false positive
  // M.AutoInit();

  // create main socket ie. not logged in
  let mainSocket = createSocket('/');
  let userSocket: Socket | null = null;
  const $login = $('#header .login');

  // = events =
  $login.find('.connect').on('submit', (e) => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const $input = $this.find('input');
    const username = $input?.val()?.toString().trim();

    // form validation
    if (!username) return;
    $input.val('');

    if (userSocket) {
      mainSocket = createSocket('/'); // todo: better way of handling anon connection. should always be open
      userSocket.disconnect();
    }
    mainSocket.disconnect();
    mainSocket = null;
    userSocket = connect({ username });
    toggleLoginState(username);

  });

  $login.find('.disconnect button').on('click', (e) => {
    e.preventDefault();
    if (!userSocket) return;
    userSocket.disconnect();
    userSocket = null;
    mainSocket = createSocket('/'); // todo: better way of handling anon connection. should always be open
    listenGlobal(mainSocket);
    toggleLoginState();
  });

  $('#main .chat form').on('submit', (e) => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const $input = $this.find('input');
    const message = $input?.val()?.toString().trim();

    // form validation
    if (!userSocket || !message) return;

    $input.val('');
    userSocket.emit('send', message);
  });

  toggleLoginState();
  listenGlobal(mainSocket);
});

// = helpers =
// @ts-ignore // false positive error - this line breaks compiler because it can't find 'io' from window even though it's there
const createSocket = (url?: string, options?: ServerOptions): Server => io(options);
const updateHeader = (text: string) => {
  $('#header header > :first-child').html(document.createTextNode(text));
};

const toggleLoginState = (username?: string) => {
  const $login = $('#header .login');
  const $chat = $('#main .chat');

  $login.find('.connect').css('display', !username ? 'block' : 'none');
  $login.find('.disconnect').css('display', username ? 'block' : 'none');
  $chat.find('form').css('display', username ? 'block' : 'none');
  updateHeader(username || 'Please Login');
};

// = main listener =
const connect = (data: { username: string }) => {
  const socket = createSocket('/users');

  socket.on('connect', () => {
    socket.emit('login', data, (e: Error | null, message: string) => {
      if (e) return console.error(e.message);
      toggleLoginState(data.username);
      updateHeader(message);
    });
  });

  // user listener
  listenGlobal(socket);
  return socket;
};

const listenGlobal = (socket: Socket) => {
  const $header = $('#header');
  const $main = $('#main');
  const $chatbox = $main.find('.chatbox');
  const $messageList = $chatbox.find('ul');
  const maxMessages = 15;

  // render server announcements
  socket.on('announce', (data: string) => {
    const $li = document.createElement('li');
    $li.appendChild(document.createTextNode(data));
    $li.classList.add('collection-item', 'black-text');
    $('#footer .announce ul').prepend($li);
  });

  // render personal alerts
  socket.on('alert', (data: string) => {
    const $div = document.createElement('div');
    $div.appendChild(document.createTextNode(data));
    $header.find('.alert ul').html($div);
  });

  // render incoming messages
  socket.on('incoming', (data: string) => {

    const $li = document.createElement('li');
    $li.appendChild(document.createTextNode(data));
    $li.classList.add('collection-item', 'cyan-text', 'text-ligten-4');
    $messageList.append($li);
    trimList($messageList, maxMessages);
  });

  // render outgoing message
  socket.on('outgoing', (data: string) => {
    const $li = document.createElement('li');
    $li.appendChild(document.createTextNode(data));
    $li.classList.add('collection-item', 'cyan-text', 'text-ligten-1', 'right-align');
    $messageList.append($li);
    trimList($messageList, maxMessages);
  });

  // refresh userlist
  socket.on('newData', (data: { users: User[], hits: number }) => {
    const maxUsers = 20;
    const users = [];
    const onlineCount = data.users.length;

    for (let i = onlineCount > maxUsers ? onlineCount - maxUsers : 0; i < onlineCount; i++) {
      const $li = document.createElement('li');
      $li.appendChild(document.createTextNode(data.users[i].username));
      $li.classList.add('collection-item', 'blue-grey-text', 'text-darken-4');
      users.push($li);
    };

    const $userlist = $main.find('#side-panel .userlist');
    $header.find('.hits span').html(data.hits.toString());
    $userlist.find('header span').html(onlineCount.toString());
    $userlist.find('ul').html('').append(...users);
  });
};

function trimList($messageList: JQuery<HTMLUListElement>, maxMessages: number) {
  if ($messageList.find('li').length > maxMessages) {
    $messageList.find('li').slice(0, 1).remove();
  }
}

