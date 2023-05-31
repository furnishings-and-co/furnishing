import { useState, useEffect } from 'react'
import './App.css'
import { RRoutes } from './components/Routes'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
const BASE_URL= "http://localhost:8080/api"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState({});
  const [cart, setCart] = useState({});
  const [items, setItems] = useState([]);

  console.log("cart", cart);
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
      console.log("response", response)
      const temp_user = await response.json();
        console.log("temp_user", temp_user)
        setUser(temp_user)
        console.log("user.id", user.id)
        const cartResponse = await fetch(`${BASE_URL}/cart/${temp_user.id}`);
        console.log("cartResponse", cartResponse);
        const cart = await cartResponse.json();
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("cart1", cart)
        setCart(cart);
        console.log("cart2", cart, "user", user)
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
      <NavBar token={token} setToken={setToken} setUser={setUser} user={user}/>
      <RRoutes items={items} setItems={setItems} cart={cart} setCart={setCart} token={token} setToken={setToken} setUser={setUser} user={user}/>
      <Footer />
    </div>
  )
}

export default App
