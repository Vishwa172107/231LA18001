import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {NewShortUrl} from "./pages/new-short-url.jsx"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {ShortenedResult} from "./pages/ShortenedResult.jsx"
import { ShortenedUrls } from './pages/shortened_urls.jsx'
import { Navbar } from './pages/Navbar.jsx'
import { Home } from './pages/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/new' element={<NewShortUrl/>}/>
        <Route path='/shortened-result' element={<ShortenedResult/>}/>
        <Route path='/shortened' element={<ShortenedUrls/>}/>
      </Routes>
    </Router>
  </StrictMode>,
)
