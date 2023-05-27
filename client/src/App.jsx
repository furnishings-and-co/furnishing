import { useState, useEffect } from 'react'
import './App.css'
import { RRoutes } from './components/Routes'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
const BASE_URL = "api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const [items, setItems] = useState([]);
  const [admin, setAdmin] = useState([false]);

  const attemptLogin = async () => {

    try {
      const token = window.localStorage.getItem('token');

      if (token) {
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const temp_user = await response.json();
        setUser(temp_user)
        const cartResponse = await fetch(`${BASE_URL}/cart/${temp_user.id}`);
        const cart = await cartResponse.json();
        localStorage.setItem("cart", JSON.stringify(cart));
        setCart(cart);
      }
    } catch (error) {
      console.error(error)
    }
  }



  useEffect(() => {
    attemptLogin();
  }, [token]);

  return (
    <div className="App">
      <NavBar token={token} setToken={setToken} setUser={setUser} user={user} />
      <RRoutes admin={admin} setAdmin={setAdmin} items={items} setItems={setItems} cart={cart} setCart={setCart} setToken={setToken} />
      <Footer />
    </div>
  )
}

export default App