import React,{useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Detect from './pages/Detect';


function App() {
  const [show,setShow]=useState(false);
  return (
    <div>
      <Router>
        {/* Navbar is rendered conditionally */}
        <Routes>
          {/* Public routes without Navbar */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Routes with Navbar */}
          <Route
            path="/*"
            element={
              <>
                <Navbar show={show} setShow={setShow}/>
                <Routes>
                  <Route path="/home" element={<Home/>} />
                  <Route path="/detect" element={<Detect/>} />
                  
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
