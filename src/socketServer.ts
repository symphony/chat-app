import * as socketio from 'socket.io';
import { Server } from 'http'; // types


// = helpers =
const removeSymbols = (s: string) => {
  const reg = /[^0-9a-zA-Z_-]+/g;
  return s.replace(reg, '');
};

const scrub = (s: string) => {
  const r1: [RegExp, string] = [/n+[\s_\.\-]?[i1l|]+[\s_\.\-]?[gq]+[_\.\-\s]*[gq69]+[e3a4i\s]*[ra4s]*s?/ig, '****'];
  const r2: [RegExp, string] = [/(f|ph)?[\s_\.\-]?[a4]+.?[gq69]+[_\.\-\s]*[gq69]+[o0\s]+[t7]*s?/ig, '****'];
  return s.replace(...r1).replace(...r2);
};

// = local data =
const onlineUsers = new Map();

// = main function =
export const listen = (httpServer: Server) => {
  const server = new socketio.Server(httpServer);

  // client connects
  server.on('connection', (client: socketio.Socket) => {
    const id = client.id;
    let username: string | null = null;

    client.on('login', (data: User, callback) => {
      username = scrub(removeSymbols(data.username));
      onlineUsers.set(id, { id, username });

      console.log('Users:', onlineUsers);
      callback(null, username);
    });

    client.on('disconnect', () => {
      onlineUsers.delete(id);
      console.log(id, 'disconnected');
    });

    client.on('send', (body: string) => {
      const message = scrub(body.trim());
      server.to(id).emit('outgoing', `${message} [${username}]`)
      server.except(id).emit('incoming', `[${username}] ${message}`)
    });

    // Client Message
    // server.to(id).emit('notify', 'Your ID is: ' + id);

    // Broadcast Message
    server.except(id).emit('announce', username + ' is online');
  });

  return server;
};


