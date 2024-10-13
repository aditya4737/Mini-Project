import { useState } from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom';

import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import CaseForm from './pages/CaseForm'
import CaseEinvoice from './pages/CaseEinvoice'
import Home from './pages/Home';
import CaseHistory from './pages/caseHistory';
import Header from './components/Header';
import Footer from './components/Footer';
import FormOne from './pages/form/form-1';
import FormTwo from './pages/form/form-2';
import FormThree from './pages/form/form-3';
import { AuthProvider } from "./Context/AuthContext";
import UserFormsData from './pages/UserFormsData';

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
        <Route path="/formone" element={< FormOne />} />
        <Route path="/formtwo" element={< FormTwo/>} />
        <Route path="/formthree" element={< FormThree/>} />
        <Route path="/caseHistory" element={<CaseHistory/>}/> 
        <Route path="/userdata" element={<UserFormsData/>}/>
      </Routes>
    <Footer/>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
