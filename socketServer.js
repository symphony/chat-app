import * as socketio from 'socket.io';

export const listen = (httpServer) => {
  const server = new socketio.Server(httpServer);

  server.on('connection', (client) => {
    const id = client.id;
    let username = null;

    client.on('name', (data) => {
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
