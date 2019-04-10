import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom"
import Store from "./redux/store.js"
import { Provider } from "react-redux"

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
//
// function run(interval, frames) {
//   let int = getRandomInt(1, frames)
//   document.body.id = "b"+int
//   int++
//   function func() {
//     document.body.id = "b"+int;
//     int++;
//     if(int === frames) { int = 1; }
//   }
//   window.setInterval(func, interval);
// }
//
// run(10000, 7);

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
