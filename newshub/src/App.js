import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter } from 'react-router-dom'
import style from './index.css'
import Dashboard from './components/dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FinanceNews from './components/finance';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        {/* Route for rendering Navbar */}
        <Route path="/" element={<Navbar />} />
        
        {/* Route for rendering Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/finance" element={<FinanceNews/>} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
