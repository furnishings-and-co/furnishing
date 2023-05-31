import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllProducts from './AllProducts';
import Home from './Home';
import Login from './Login';
import Cart from './Cart';
import Profile from './Profile';
import SingleProduct from './SingleProduct';

export const RRoutes = ({token, setToken, user, setUser, cart, setCart, items, setItems, admin, setAdmin}) => {
    return (
        <div>
            <Routes>
                <Route path= "/" element= {<Home token={token} setToken={setToken} setUser={setUser} user={user}/>}></Route>
                <Route path="/products" element={<AllProducts admin={admin} setAdmin={setAdmin} setCart={setCart} token={token} setToken={setToken} setUser={setUser} user={user}/>}> </Route>
                <Route path="/login" element={<Login token={token} setToken={setToken} setUser={setUser} user={user}/>}></Route>
                <Route path="/cart" element={<Cart items={items} setItems={setItems} cart={cart} setCart={setCart} token={token} setToken={setToken} setUser={setUser} user={user}/>}></Route>
                <Route path="/profile" element={<Profile items={items} setItems={setItems} cart={cart} setCart={setCart} token={token} setToken={setToken} setUser={setUser} user={user}/>}></Route>
                <Route path="/products/single/:id" element={<SingleProduct admin={admin} setAdmin={setAdmin} cart={cart} setCart={setCart} token={token} setToken={setToken} setUser={setUser} user={user}/>}></Route>
            </Routes>
        </div>
    );
};