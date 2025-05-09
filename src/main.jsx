import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { SafeLocationsProvider } from './contexts/SafeLocationsContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <SafeLocationsProvider>
            <App />
          </SafeLocationsProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>,
)