import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './styles/reset.css'
import './styles/styles.css'
import { Router } from 'express'

const domNode = document.getElementById('root')
const root = createRoot(domNode)



root.render(<Router>
    <App />
    </Router>
    )
