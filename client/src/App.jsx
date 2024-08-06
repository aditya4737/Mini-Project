import { useState } from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom';

import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import CaseForm from './pages/CaseForm'
import CaseEinvoice from './pages/CaseEinvoice'
import Lawyers from './pages/Lawyers'
import About from './pages/About'
import Chat from './pages/Chat';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Signin" element={<Signin/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/CaseForm" element={<CaseForm/>}/>
        <Route path="/CaseEinvoice" element={<CaseEinvoice/>}/>
        <Route path="/Lawyers" element={<Lawyers/>}/>
        <Route path="/Chat" element={<Chat/>}/>
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
