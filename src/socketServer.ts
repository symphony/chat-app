import * as socketio from 'socket.io';
import { Server } from 'http'; // types

const onlineUsers = new Map();

export const listen = (httpServer: Server) => {
  const server = new socketio.Server(httpServer);

  server.on('connection', (client: socketio.Socket) => {
    const id = client.id;
    let username = null;

    client.on('name', (data: User) => {
      username = data.username;
      server.except(id).emit('announce', username + ' is online');
    });

    client.on('disconnect', () => {
      console.log(id, 'disconnected');
    });

    // Broadcast Message

    // Client Message
    server.to(id).emit('notify', 'Your ID is: ' + id);

  });

  return server;
};
