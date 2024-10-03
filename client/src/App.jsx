import { useState } from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom';

import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import CaseForm from './pages/CaseForm'
import CaseEinvoice from './pages/CaseEinvoice'
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
        <Route path="/Signin" element={<Signin/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/CaseForm" element={<CaseForm/>}/>
        <Route path="/CaseEinvoice" element={<CaseEinvoice/>}/>
        {/* <Route path="/caseHistory" element={<caseHistory/>}/> */}
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
