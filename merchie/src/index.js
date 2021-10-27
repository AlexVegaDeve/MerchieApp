import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppRouter from './routers/AppRouter';
// import axios from 'axios';
import'./bootstrap.min.css';
import './app.css';

// checkLoginStatus(){
//   axios.get('/')
// }

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);
