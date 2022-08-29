import { useState, useEffect, } from 'react';
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

const socket = io();

// = helpers =
// @ts-ignore // false positive
const createSocket = (url?: string, options?: ServerOptions): Server => io(options);

// = main component =
const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [header, setHeader] = useState(currentUser || 'Please Login');

  useEffect(() => {
    sendPing();

    // = global listeners =
    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

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
      socket.off('announce');
      socket.off('alert');
      socket.off('incoming');
      socket.off('outgoing');
      socket.off('newData');
      socket.off('pong');
    };
  }, []);


  // = functions =
  const sendPing = () => {
    socket.emit('ping');
  }

  const onConnect = (username: string) => {
    console.log('username set', username);
    const socket = createSocket('/users');

    socket.emit('login', { username }, (e: Error | null, message: string) => {
      if (e) return console.error(e.message);
      setCurrentUser(username);
      setHeader(message);
    });
  };

  const onDisconnect = () => {
    setCurrentUser(null);
  };


  // = render =
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box height='100vh' display='flex' flexDirection='column'  >
        <Router>
          <Navbar user={currentUser}  onConnect={onConnect} onDisconnect={onDisconnect} />

          <Routes>
            {Object.values(appRoutes).map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>

          <p>Last pong: {lastPong || '-'}</p>
          <Footer />
        </Router>
      </Box>

    </ThemeProvider>
  );
}

export default App;