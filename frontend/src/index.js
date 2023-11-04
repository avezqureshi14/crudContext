import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProductContextProvider } from "./context/ProductContext";
import { AuthContextProvider } from "./context/AuthContext";
ReactDOM.render(
  <AuthContextProvider>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
