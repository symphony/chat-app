import React from "react";
import {
  Box,
  CssBaseline,
  Paper,
  Typography,
  ThemeProvider,
  createTheme
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#63b8ff",
      main: "#0989e3",
      dark: "#005db0",
      contrastText: "#000",
    },
    secondary: {
      main: "#4db6ac",
      light: "#82e9de",
      dark: "#00867d",
      contrastText: "#000",
    },
  },
});


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Paper
          elevation={3}
          sx={{ padding: "1rem", backgroundColor: "secondary.dark" }}
        >
          <Typography color="primary.dark" variant="h1">
            Chat App
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;