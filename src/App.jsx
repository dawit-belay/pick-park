import './App.css'

import Home from './pages/home.jsx';
import Navbar from './pages/navbar.jsx';
import Cars from './pages/cars.jsx';
import Admin from './pages/admin.jsx';
import Report from './pages/report.jsx';
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import { CheckingProvider } from "./context/CheckingContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AdminLogin from './pages/AdminLogin.jsx';
import OfficerRegister from './pages/OfficerRegister.jsx';
import OfficerLogin from './pages/officerLogin.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CheckingProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin/register-officer" element={<OfficerRegister />} />
            <Route path="/officer-login" element={<OfficerLogin />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </CheckingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
