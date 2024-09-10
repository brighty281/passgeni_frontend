import React from 'react'
import Home from './Pages/Home';
import Navbar from './Pages/Navbar';
import Passwords from './Pages/Passwords';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
function App() {
  return (
   <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/passwords" element={<Passwords/>}/>

    </Routes>
   </Router>
  );

}

export default App;
