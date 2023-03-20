import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { App } from './App';
import './index.css';

const defaultTheme = createTheme();

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <CssBaseline />
      <ThemeProvider theme={defaultTheme}>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
