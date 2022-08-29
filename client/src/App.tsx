import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Paper,
  Typography,
  ThemeProvider
} from '@mui/material';
import { routes as appRoutes } from './routes';
import { appTheme } from './themes';

// Components
import Chat from 'components/Chat';
import Profile from 'components/Profile';


const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />

      <Box height='100vh' display='flex' flexDirection='column'      >
        <Router>
          <Routes>
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Router>
      </Box>

    </ThemeProvider>
  );
}

export default App;