import { useState, useEffect } from 'react'
import './App.css'
import { RRoutes } from './components/Routes'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar';
const BASE_URL= "http://localhost:8080/api"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState({});
  const [cart, setCart] = useState({});

  const attemptLogin = async () => {
    const token = window.localStorage.getItem('token');
   
    if (token) {
      try{
      await fetch(`${BASE_URL}/auth`, {
        method: 'GET',
        headers: {
          authorization: token,
        },
      })
      const user = await response.json();
      setAuth(user);
      const cartResponse = await fetch(`${BASE_URL}/carts/${user.id}`);
      const cart = await cartResponse.json();
      setCart(cart);
    } catch (error) {
      // Handle any errors that occurred during the fetch requests
      console.error('Error occurred:', error);
    }
    
}
console.log(token, cart, user, auth)
useEffect(() => {
  attemptLogin();
}, []);
}
      
  return (
    <div className="App">
      <NavBar token={token} setToken={setToken} setUser={setUser} user={user}/>
      <RRoutes token={token} setToken={setToken} setUser={setUser} user={user}/>
    </div>
  )
}

export default App
