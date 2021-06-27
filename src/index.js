import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import {store} from './redux/store/Store';
import "./assets/styles/style.css";

const rootDiv = document.createElement('div');
rootDiv.id = "root"

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(rootDiv)
);
