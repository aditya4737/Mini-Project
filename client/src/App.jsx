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
import { AuthProvider } from "./Context/AuthContext";

function App() {
 

  return (
    <BrowserRouter>
    <AuthProvider>
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
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
