import React from 'react';
import { render, screen } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1565C0'
    },
    secondary: {
      main: '#FFFFFF'
    },
  },
});

test('renders learn react link', () => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
