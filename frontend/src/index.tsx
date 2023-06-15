import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/poppins';

const theme = createTheme({
  palette: {
    primary: {
      main: '#504DA6', // Replace with your primary color hex code
    },
    secondary: {
      main: '#F5F5F5', // Replace with your secondary color hex code
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router />
   </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
