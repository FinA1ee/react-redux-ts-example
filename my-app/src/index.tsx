import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoAppReducers from './reducers';

import './index.css';

const store = createStore(todoAppReducers);

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
