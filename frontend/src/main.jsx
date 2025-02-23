import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
createRoot(document.getElementById('root')).render(
  <>
    <App/>
  </>
)
