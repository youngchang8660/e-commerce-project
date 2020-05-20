import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {Provider} from 'react-redux';
import store from './ducks/store'
import {HashRouter, BrowserRouter} from 'react-router-dom'
import * as serviceWorker from "./serviceWorker";
const Router = process.env.NODE_ENV ==='development' ? HashRouter : BrowserRouter

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
