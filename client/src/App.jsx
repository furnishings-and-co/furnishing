import { useState } from 'react'
import './App.css'
import { RRoutes } from './components/Routes'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <NavBar token={token} setToken={setToken} setUser={setUser} user={user}/>
      <RRoutes token={token} setToken={setToken} setUser={setUser} user={user}/>
      <Footer />
    </div>
  )
}

export default App
