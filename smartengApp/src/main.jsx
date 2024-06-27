import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "..//routes";
import "./index.css";

import { AuthProvider } from "./hooks/auth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>,
);
