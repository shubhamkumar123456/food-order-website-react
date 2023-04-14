
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/register/Signup';
import Entry from './pages/entry/Entry';
import Cart from './pages/cartpage/Cart';

import CompanySignup from "./pages/companyPage/companyRegister/CompanySignup";
import CompanyLogin from './pages/companyPage/companyLogin/CompanyLogin';
import CompanyHome from './pages/companyPage/companyHome/CompanyHome';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
   
      <Routes>
        <Route path="/" element={ <Entry/>}/>
      {/* company routes */}
        <Route path="/companyLogin" element={<CompanyLogin/>}/>
        <Route path="/companySignup" element={<CompanySignup/>}/>
        <Route path="/companyHome" element={<CompanyHome/>}/>
        
        {/* customer routes */}
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
   
   </BrowserRouter>
    </div>
  );
}

export default App;
