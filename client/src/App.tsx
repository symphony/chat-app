import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Paper,
  Typography,
  ThemeProvider
} from '@mui/material';

import { routes as appRoutes } from './routes';
import { lightTheme, darkTheme } from './themes';

// Components
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';


const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box height='100vh' display='flex' flexDirection='column'  >
        <Router>
          <Navbar />
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