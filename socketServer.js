import * as socketio from 'socket.io';

export const listen = (httpServer) => {
  const server = new socketio.Server(httpServer);

  server.on('connection', (client) => {
    console.log(client.id, 'connected', client.data);
    client.on('disconnect', () => {
      console.log(client.id, 'disconnected');
    });

    // Broadcast Message
    server.emit('announce', client.id + ' is online');

    // Client Message
    server.to(client.id).emit('notify', client.id + ' is online');

  });

  return server;
};
