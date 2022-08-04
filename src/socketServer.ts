import * as socketio from 'socket.io';
import { Server } from 'http'; // types


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

// = local data =
const onlineUsers: { [id: string]: User } = { test: { id: 'abcdefg', username: 'test-user' } };

// = main function =
export const listen = (httpServer: Server) => {
  const socket = new socketio.Server(httpServer);

  // client connects
  socket.on('connection', (client: socketio.Socket) => {
    const id = client.id;
    let username: string | null = null;
    if (!username) socket.to(id).emit('userlist:', Object.values(onlineUsers));
    console.log(id, 'connected'); // anonymous login

    client.on('login', (body: { username: string }, callback) => {
      username = scrub(removeSymbols(body.username));
      onlineUsers[id] = { id, username };
      callback(null, username);


      console.log(username, 'logged in');
      socket.except(id).emit('announce', username + ' is online');
      socket.emit('userlist:', { ...onlineUsers });
    });

    client.on('disconnect', () => {
      console.log(username, 'logged out');
      delete onlineUsers[id];
      socket.emit('userlist:', Object.values(onlineUsers));
    });

    client.on('send', (body: string) => {
      const message = scrub(body.trim());
      console.log('sending message', message, 'from', username);
      socket.to(id).emit('outgoing', `${message} [${username}]`)
      socket.except(id).emit('incoming', `[${username}] ${message}`)
    });

    // Client Message
    // server.to(id).emit('alert', 'Your ID is: ' + id);

    socket.emit('userlist:', Object.values(onlineUsers));
  });

  return socket;
};



