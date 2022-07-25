import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
   h1: {
    fontSize: '36px',
    fontWeight: 600
   },
   h2: {
    fontSize: '32px',
   }
  },
});

export default theme;