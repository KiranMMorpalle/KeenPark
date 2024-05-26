import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HostContextProvider from './context/HostContextProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HostContextProvider>

      <App />
    </HostContextProvider>
  </React.StrictMode>,
)
