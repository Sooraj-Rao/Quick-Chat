import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Context from './Components/Context/Context.jsx'
import SocketContextProvider from './Components/Context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </Context>
  </React.StrictMode>,
)
