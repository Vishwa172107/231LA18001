import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {NewShortUrl} from "./pages/new-short-url.jsx"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {ShortenedResult} from "./pages/ShortenedResult.jsx"
import { ShortenedUrls } from './pages/shortened_urls.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<NewShortUrl/>}/>
        <Route path='/shortened-result' element={<ShortenedResult/>}/>
        <Route path='/shortened' element={<ShortenedUrls/>}/>
      </Routes>
    </Router>
  </StrictMode>,
)
