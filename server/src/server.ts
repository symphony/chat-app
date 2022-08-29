import * as socketio from 'socket.io';
import { Server } from 'http'; // types


// = local data =
const onlineUsers: UserDB = { test: { id: 'abcdefg', username: 'welcome-bot' } };
const stats: AppStats = {
  totalConnections: 0,
};

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

// parses local data
const getUpdatedData = () => {
  return { users: Object.values(onlineUsers), hits: stats.totalConnections };
};


// = main function =
export const listen = (httpServer: Server) => {
  const socket = new socketio.Server(httpServer);

  // on page load or form submit (anonymous connection)
  socket.on('connection', (client: socketio.Socket) => {
    const id = client.id;
    let username: string | null = null;

    socket.to(id).emit('newData', getUpdatedData());
    console.log(id, 'connected');

    // = events =
    client.on('ping', () => {
      socket.to(id).emit('pong');
    });

    // user logs in
    client.on('login', (body: { username: string }, callback) => {
      username = scrub(removeSymbols(body.username));
      onlineUsers[id] = { id, username };
      callback(null, username);

      console.log(username, 'logged in');
      socket.emit('announce', username + ' is online');
      socket.to(id).emit('incoming', { self: false, sender: 'welcome-bot', message: `Hello, ${username}!` });

      stats.totalConnections++;
      socket.emit('newData', getUpdatedData());

    });

    client.on('disconnect', () => {
      console.log(username ?? id, 'logged out');
      if (username) delete onlineUsers[id];
      username = null;
      socket.emit('announce', username + ' is offline');
      socket.emit('newData', getUpdatedData());
    });

    client.on('send', (body: string) => {
      const message = scrub(body.trim());
      console.log('received', message, 'from', username);
      socket.except(id).emit('incoming', { self: false, sender: username, message })
      socket.to(id).emit('incoming', { self: true, sender: username, message })
    });

    // Client Message
    // server.to(id).emit('alert', 'Your ID is: ' + id);
  });

  return socket;
};
