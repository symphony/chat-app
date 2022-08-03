import * as socketio from 'socket.io';
import { Server } from 'http'; // types

const onlineUsers = new Map();
const r1: [RegExp, string] = [/[^0-9a-zA-Z_-]+/, ''];
const r2: [RegExp, string] = [/n+[\s_\.\-]?[i1l|]+[\s_\.\-]?[gq]+[_\.\-]?\s*[gq69]+[e3a4i\s]*[ra4s]*s?/ig, '****'];
const r3: [RegExp, string] = [/(f|ph)+[\s_\.\-]?[a4]+[\s_\.\-]?[gq69]+[_\.\-]?\s*[gq69]+[o0ie\s]*[t7]*s?/ig, '****'];
const c = (s: string) => s.replace(...r1).replace(...r2).replace(...r3).trim();

export const listen = (httpServer: Server) => {
  const server = new socketio.Server(httpServer);

  // client connects
  server.on('connection', (client: socketio.Socket) => {
    const id = client.id;
    let username = null;

    client.on('name', (data: User) => {
      username = c(data.username);
      onlineUsers.set(id, { id, username })

      console.log('Users:', onlineUsers);
    });

    client.on('disconnect', () => {
      onlineUsers.delete(id);
      console.log(id, 'disconnected');
    });

    // Client Message
    server.to(id).emit('notify', 'Your ID is: ' + id);

    // Broadcast Message
    server.except(id).emit('announce', username + ' is online');
  });

  return server;
};
