import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Routes } from "react-router-dom";
import { AppProvider } from "./provider/Context";
import { ThemeProvider } from "@material-tailwind/react";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppProvider>
        <Routes>
          <App />
        </Routes>
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
