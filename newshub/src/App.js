import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter } from 'react-router-dom'
import style from './index.css'
import Dashboard from './components/dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FinanceNews from './components/finance';
import Health from './components/health';
import Home from './components/home';
import Sports from './components/sports';
import Entertainment from './components/entertainment'
import Politics from './components/politics';
function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        {/* Route for rendering Navbar */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home/>} />
        
        {/* Route for rendering Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/finance" element={<FinanceNews/>} />
        <Route path="/health" element={<Health/>} />
        <Route path="/sports" element={<Sports/>} />
        <Route path="/entertainment" element={<Entertainment/>} />
        <Route path="/politics" element={<Politics/>} />
        
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
