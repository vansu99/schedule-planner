import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.scss";
import store from "./store";
import { Provider } from "react-redux";

// context
import { GlobalProvider } from "contexts/global-context";
// i18n
import "locales/i18n";

ReactDOM.render(
  <Provider store={store}>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
