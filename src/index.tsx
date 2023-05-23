import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from '@ui/theme';
import { GlobalStyle } from '@ui/theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme= {theme}>
    <GlobalStyle/>
    <App/>
  </ThemeProvider>,
)