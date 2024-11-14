import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { AuthProvider } from "./context/Auth";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <AuthProvider>
  <BrowserRouter>
    <Provider store={store}>
      {" "}
      <App />
    </Provider>
  </BrowserRouter>
  </AuthProvider>
);
