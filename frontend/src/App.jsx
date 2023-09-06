import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Writeblog from './components/Writeblog';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login';
import Alert from './components/Alert';

function App() {

  const [alert, setAlert] = useState({msg:"", type:''});

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert({msg:"", type:''});
    }, 2500);
  }

  return (
    <>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <Routes>
          <Route exact path='/' element={<Home showAlert={showAlert} />} />
          <Route exact path='/write' element={<Writeblog showAlert={showAlert} />} />
          <Route exact path='/login' element={<Login showAlert={showAlert} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
