import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './containers/App'
import { ChatProvider } from "./containers/hooks/useChat"

const root = ReactDOM.createRoot( document.getElementById( 'root' ) )
root.render(

  <React.StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </React.StrictMode>
)