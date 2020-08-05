import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from './redux/redux';
import { Routes } from './Routes';

import './App.scss';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="app">
        <Routes />
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
