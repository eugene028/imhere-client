import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './ui/theme';
import { GlobalStyle } from './ui/theme';

ReactDOM.render(
  <ThemeProvider theme= {theme}>
    <GlobalStyle/>
    <App/>
  </ThemeProvider>,
  document.getElementById('root')
);