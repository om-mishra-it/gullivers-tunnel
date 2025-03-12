import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LoaderProvider } from "./context/LoaderContext"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <LoaderProvider>
        <StrictMode>
            <App />
        </StrictMode>
    </LoaderProvider>,
)
