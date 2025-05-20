import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./Interceptors/authInterceptors.js";
import "./index.css";
import "./axios.config.js";
import { AuthProvider } from "./Hooks/useAuth.jsx";
import { LoadingProvider } from "./Hooks/useLoading.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoadingProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LoadingProvider>
  </BrowserRouter>,
);
