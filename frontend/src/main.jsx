import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Routes } from "react-router-dom";
import { AppProvider } from "./provider/Context";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <Routes>
        <App />
      </Routes>
    </AppProvider>
  </React.StrictMode>,
)
