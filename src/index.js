import React from "react";

// import ReactDOM from "react-dom";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";
import {store} from './Redux/store/store'
import {Provider} from 'react-redux'
import './scss/app.scss'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
<StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
</StrictMode>
);