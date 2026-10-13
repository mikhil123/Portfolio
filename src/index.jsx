import React from 'react';
import { render } from 'react-dom';
import App from './App';

// See https://reactjs.org/docs/strict-mode.html
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
