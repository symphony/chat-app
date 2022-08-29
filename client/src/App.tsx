import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io, { SocketOptions } from 'socket.io-client';
import { Server, ServerOptions } from 'socket.io'; // types
import { lightTheme, darkTheme } from 'themes';
import { routes as appRoutes } from 'routes';
import {
  Box,
  CssBaseline,
  Paper,
  Typography,
  ThemeProvider
} from '@mui/material';

// = components =
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Chatbox from 'components/Chatbox';

// = init =
// create client connection
const newSocket = io('/');

// = main component =
const App = () => {
  const [socket, setSocket] = useState(newSocket || null)
  const [lastPong, setLastPong] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ self: boolean, message: string }[]>([]);

  useEffect(() => {
    sendPing();

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });
  }, []);

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
      setMessages(() => [...messages, { self: false, message: data }])
    });

    // render outgoing message
    socket.on('outgoing', (data: string) => {
      setMessages(() => [...messages, { self: true, message: data }])
    });

    // refresh userlist
    socket.on('newData', (data: { users: User[], hits: number }) => {
      const maxUsers = 20;
      const users = [];
      const onlineCount = data.users.length;
    });


    // cleanup
    return () => {
      socket.off('announce');
      socket.off('alert');
      socket.off('incoming');
      socket.off('outgoing');
      socket.off('newData');
    };
  }, [socket])

  // = functions =
  const sendPing = () => {
    socket.emit('ping');
  };

  const onConnect = (username: string) => {
    sendPing();
    setSocket(io('/users'));

    socket.emit('login', { username }, (e: Error | null, message: string) => {
      if (e) return console.error(e.message);
      setCurrentUser(username);
    });
  };

  const onDisconnect = () => {
    sendPing();

    if (!socket.connected) return;
    socket.disconnect();
    setCurrentUser(null);
    setSocket(io('/')); // global socket
  };


  // = render =
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box height='100vh' display='flex' flexDirection='column'  >
        <Router>
          <Navbar user={currentUser} onConnect={onConnect} onDisconnect={onDisconnect} />

          <Routes>
            {Object.values(appRoutes).map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
          <Chatbox messages={messages} />
          <p>Last pong: {lastPong || '-'}</p>
          <Footer />
        </Router>
      </Box>

    </ThemeProvider>
  );
}

export default App;