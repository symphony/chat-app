import { useEffect } from 'react';
import { Server } from 'socket.io';

export const useGlobalListen = (socket: Server) => {
  useEffect(() => {

    // = global listeners =
    // render server announcements
    socket.on('announce', (data: string) => {
    });

    // render personal alerts
    socket.on('alert', (data: string) => {
    });

    // render incoming messages
    const maxMessages = 15;
    socket.on('incoming', (data: string) => {
    });

    // render outgoing message
    socket.on('outgoing', (data: string) => {
    });

    // refresh userlist
    socket.on('newData', (data: { users: User[], hits: number }) => {
      const maxUsers = 20;
      const users = [];
      const onlineCount = data.users.length;
    });


    // cleanup
    return () => {
      // @ts-ignore // todo debug
      socket.off('announce');
      // @ts-ignore // todo debug
      socket.off('alert');
      // @ts-ignore // todo debug
      socket.off('incoming');
      // @ts-ignore // todo debug
      socket.off('outgoing');
      // @ts-ignore // todo debug
      socket.off('newData');
    };
  }, [])
};
