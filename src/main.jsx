import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Onboard from './Onboard.jsx'
import Wallet from './Wallet.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/onboard/:shopId" element={<Onboard />} />
                <Route path="/wallet/:identifier" element={<Wallet />} />
                <Route path="/card/:identifier" element={<App />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)