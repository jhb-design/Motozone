import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import store from "./Reducer/store";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
