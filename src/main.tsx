import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import AppProviders from './providers/wrap-providers.tsx'

createRoot(document.getElementById('root')!).render(
    <AppProviders>
      <App />
    </AppProviders>
)
