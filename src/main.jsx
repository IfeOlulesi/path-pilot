import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App'
// import Test from './test.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Test /> */}
  </StrictMode>,
)
