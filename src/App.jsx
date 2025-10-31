import './App.css'

import Home from './pages/home.jsx';
import Navbar from './pages/navbar.jsx';
import CheckIng from './pages/checking.jsx';
import Cars from './pages/cars.jsx';
import Admin from './pages/admin.jsx';
import Report from './pages/report.jsx';
import { BrowserRouter ,Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckIng />} />
        <Route path="/checkout" element={<CheckIng />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
