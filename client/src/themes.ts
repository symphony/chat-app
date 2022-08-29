import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0989e3',
      light: '#63b8ff',
      dark: '#005db0',
      contrastText: '#000',
    },
    secondary: {
      main: '#4db6ac',
      light: '#82e9de',
      dark: '#00867d',
      contrastText: '#000',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#546e7a',
      light: '#63b8ff',
      dark: '#212121',
      contrastText: '#000',
    },
    secondary: {
      main: '#ee6e73',
      light: '#82e9de',
      dark: '#26a69a',
      contrastText: '#000',
    },
  },
});
