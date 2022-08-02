import * as socketio from 'socket.io';

export const listen = (httpServer) => {

  const server = new socketio.Server(httpServer);

  server.on('connect', () => {
    console.log('hi');
  });
  return server;
};
