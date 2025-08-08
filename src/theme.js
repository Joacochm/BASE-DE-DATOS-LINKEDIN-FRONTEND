// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A66C2',
      light: '#4da9ff',
      dark: '#004a8f',
      contrastText: '#fff',
    },
    background: {
      default: '#f3f6f8',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Roboto", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: 'none' },
      },
    },
  },
});

export default theme;
