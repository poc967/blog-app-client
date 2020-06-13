import React from 'react';
import ReactDOM from 'react-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'
import App from './App';
import * as serviceWorker from './serviceWorker';

// redux
import { Provider } from 'react-redux'
import { configureStore } from './store'
import { PersistGate } from 'redux-persist/integration/react'
const { store, persistor } = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// initiate animate on scroll
AOS.init();