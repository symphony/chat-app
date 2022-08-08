import * as socketio from 'socket.io';
import { Server } from 'http'; // types

// = types =
interface User {
  id: string;
  username: string;
}

interface UserDB {
  [id: string]: User;
};

// = local data =
const onlineUsers: UserDB = { test: { id: 'abcdefg', username: 'welcome-bot' } };

// = helpers =
const removeSymbols = (s: string) => {
  const reg = /[^0-9a-zA-Z_-]+/g;
  return s.replace(reg, '');
};

// removes bad words
const scrub = (s: string) => {
  const r1: [RegExp, string] = [/n+[\s_\.\-]?[i1l|]+[\s_\.\-]?[gq]+[_\.\-\s]*[gq69]+[e3a4i\s]*[ra4s]*s?/ig, '****'];
  const r2: [RegExp, string] = [/(f|ph)?[\s_\.\-]?[a4]+.?[gq69]+[_\.\-\s]*[gq69]+[o0\s]+[t7]*s?/ig, '****'];
  return s.replace(...r1).replace(...r2);
};

// = socket helpers =
const emitUserlist = (socket: any, users: UserDB, id: User['id'] | null = null) => {
  if (id) return socket.to(id).emit('userlist', { users: Object.values(users) });
  socket.emit('userlist', { users: Object.values(users) });
};

// = main function =
export const listen = (httpServer: Server) => {
  const socket = new socketio.Server(httpServer);

  // on page load or form submit
  socket.on('connection', (client: socketio.Socket) => {
    const id = client.id;
    let username: string | null = null;

    emitUserlist(socket, onlineUsers, id);
    console.log(id, 'connected');

    // = events =
    // user logs in
    client.on('login', (body: { username: string }, callback) => {
      username = scrub(removeSymbols(body.username));
      onlineUsers[id] = { id, username };
      callback(null, username);

      console.log(username, 'logged in');
      socket.emit('announce', username + ' is online');
      socket.to(id).emit('incoming', `[welcome-bot] Hello, ${username}!`);
      emitUserlist(socket, onlineUsers);
    });

    client.on('disconnect', () => {
      console.log(username ?? id, 'logged out');
      if (username) delete onlineUsers[id];
      username = null;
      socket.emit('announce', username + ' is offline');
      emitUserlist(socket, onlineUsers);
    });

    client.on('send', (body: string) => {
      const message = scrub(body.trim());
      console.log('sending message', message, 'from', username);
      socket.to(id).emit('outgoing', `${message} [${username}]`)
      socket.except(id).emit('incoming', `[${username}] ${message}`)
    });

    // Client Message
    // server.to(id).emit('alert', 'Your ID is: ' + id);
  });

  return socket;
};

