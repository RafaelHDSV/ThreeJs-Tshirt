import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { VieiraAnalytics } from '@vieira/analytics/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <VieiraAnalytics projectKey='tshirt-threejs' />
  </StrictMode>,
)
