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


// = init =
// create client connection
const newSocket = io('/');

// = main component =
const App = () => {
  const [socket, setSocket] = useState(newSocket || null)
  const [lastPong, setLastPong] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const maxMessages = 15;

  // for debugging
  useEffect(() => {
    // console.log(username + '\'s socket', socket);
  }, [socket])

  // user loads page
  useEffect(() => {
    sendPing();

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });
  }, []);

  // global listeners
  useEffect(() => {
    socket.on('announce', (data: string) => {
    });

    socket.on('alert', (data: string) => {
    });

    socket.on('incoming', (data: Message) => {
      console.log('incoming');
      setMessages(() => [...messages, data].slice(messages.length >= maxMessages ? 1 : 0))
    });

    // refresh userlist
    socket.on('newData', (data: { users: User[], hits: number }) => {
      const maxUsers = 20;
      const users = [];
      const onlineCount = data.users.length;
    });

    // cleanup
    return () => {
      socket.off('pong');
      socket.off('announce');
      socket.off('alert');
      socket.off('incoming');
      socket.off('newData');
    };
  }, [])


  // = functions =
  const sendPing = () => {
    socket.emit('ping');
  };

  const onConnect = (username: string) => {
    sendPing();
    setSocket(io('/users'));

    socket.emit('login', { username }, (e: Error | null, message: string) => {
      if (e) return console.error(e.message);
      setUsername(username);
    });
  };

  const onDisconnect = () => {
    sendPing();

    socket.disconnect();
    setUsername(null);
    setSocket(io('/')); // global socket
  };

  const onSend = (message: string) => {
    socket.emit('send', message, (e: Error | null, data: Message) => {
      if (e) return console.error(e.message);
      setMessages(() => [...messages, { ...data }].slice(messages.length >= maxMessages ? 1 : 0))
    });
  };


  // = render =
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box height='100vh' display='flex' flexDirection='column'  >
        <Router>
          <Navbar user={username} onConnect={onConnect} onDisconnect={onDisconnect} />

          <Routes>
            {Object.values(appRoutes).map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component username={username} messages={messages} onSend={onSend} />}
              />
            ))}
          </Routes>

          <Footer lastPong={lastPong} />
        </Router>
      </Box>

    </ThemeProvider>
  );
}

export default App;