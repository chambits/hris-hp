import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    text: {
      primary: '#000000',
      secondary: '#757575',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f48fb1',
    },
    text: {
      primary: '#ffffff',
      secondary: '#999999',
    },
    background: {
      default: '#111827',
      paper: '#090E23',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});
