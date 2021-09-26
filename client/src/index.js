import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { UserProvider } from './context/UserProvider.js';
import { ParksCampsProvider } from './context/ParksCampsProvider.js';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <ParksCampsProvider>
      <App />
      </ParksCampsProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

