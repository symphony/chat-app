import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { Server, Socket, ServerOptions } from 'socket.io'; // types
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

// = helpers =
const createSocket = (url?: string, options?: ServerOptions): Server => io(options);


// = main component =
const App = () => {
  const [mainSocket, setMainSocket] = useState(null);

  // Event Handlers
  const onConnect = (username: string) => {
    setMainSocket(createSocket('/'));
    return;
  };

  const onDisconnect = () => {
    return;
  };


  // = render =
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box height='100vh' display='flex' flexDirection='column'  >
        <Router>
          <Navbar onConnect={onConnect} onDisconnect={onDisconnect} />
          <Routes>
            {Object.values(appRoutes).map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
          <Footer />
        </Router>
      </Box>

    </ThemeProvider>
  );
}

export default App;