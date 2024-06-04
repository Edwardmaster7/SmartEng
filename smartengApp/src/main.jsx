import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from '..//routes'
import "./index.css";
import Header from '../src/components/Header'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <Routes />
  </React.StrictMode>,
);
