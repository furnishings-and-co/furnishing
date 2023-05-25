import React, {useState, useEffect} from 'react';
import '../styles/Home.css'
const BASE_URL= "http://localhost:8080/api";

const Home = () => {
    const [user, setUser] = useState({});
    const [auth, setAuth] = useState({});
    const [cart, setCart] = useState({});
  
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
        console.log(response)
        const temp_user = await response.json();
          console.log("first", temp_user)
          // setAuth(temp_user);
          // setUser(temp_user)
          // const cartResponse = await fetch(`${BASE_URL}/carts/${user.id}`);
          // const cart = await cartResponse.json();
          // setCart(cart);
        }
     } catch (error) {
        console.error(error)
     }
     
     console.log("second", cart, user, auth)
  }
  
 

  useEffect(() => {
    attemptLogin();
  }, []);


  return (
    <div>
        Home
    </div>
);
  }
    


export default Home;