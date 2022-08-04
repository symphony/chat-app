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

// = socket functions =
const emitOnlineUsers = (id?: string) => {
  // TODO: emit
  console.log('users:', Object.values(onlineUsers));
  console.log('users:', Object.values(onlineUsers));
};

// = local data =
const onlineUsers: { [id: string]: User } = {};

// = main function =
export const listen = (httpServer: Server) => {
  const server = new socketio.Server(httpServer);

  // client connects
  server.on('connection', (client: socketio.Socket) => {
    const id = client.id;
    let username: string | null = null;
    console.log(id, 'connected');


    client.on('login', (data: { username: string }, callback) => {
      username = scrub(removeSymbols(data.username));
      onlineUsers[id] = { id, username };

      server.except(id).emit('announce', username + ' is online');
      emitOnlineUsers();
      callback(null, username);
    });

    client.on('disconnect', () => {
      delete onlineUsers[id];
      console.log(id, 'disconnected');
      emitOnlineUsers();
    });

    client.on('send', (body: string) => {
      const message = scrub(body.trim());
      server.to(id).emit('outgoing', `${message} [${username}]`)
      server.except(id).emit('incoming', `[${username}] ${message}`)
    });

    // Client Message
    // server.to(id).emit('alert', 'Your ID is: ' + id);

    emitOnlineUsers(id);
  });

  return server;
};



