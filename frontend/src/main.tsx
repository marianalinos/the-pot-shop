import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './pages/App'
import { CustomerProvider } from './context/CustomerContext'

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <Router>
      <CustomerProvider>
        <App />
      </CustomerProvider>
    </Router>
  </StrictMode>
)