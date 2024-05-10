import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Routes } from "react-router-dom";
import { AppProvider } from "./provider/Context";
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <Routes>
        <App />
      </Routes>
    </AppProvider>
  </React.StrictMode>
)
