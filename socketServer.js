import * as socketio from 'socket.io';

export const listen = (httpServer) => {
  const server = new socketio.Server(httpServer);

  server.on('connection', (client) => {
    console.log(client.id, 'user online');


  });

  return server;
};
