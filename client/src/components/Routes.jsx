import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllProducts from './AllProducts';
import Home from './Home';
import Login from './Login';
import Cart from './Cart';
import Profile from './Profile';
import SingleProduct from './SingleProduct';

export const RRoutes = ({ setToken, cart, setCart, items, setItems, admin, setAdmin }) => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/products" element={<AllProducts admin={admin} setAdmin={setAdmin} setCart={setCart} />}> </Route>
                <Route path="/login" element={<Login setToken={setToken} />}></Route>
                <Route path="/cart" element={<Cart setItems={setItems} cart={cart} setCart={setCart} />}></Route>
                <Route path="/profile" element={<Profile items={items} setItems={setItems} />}></Route>
                <Route path="/products/single/:id" element={<SingleProduct admin={admin} setAdmin={setAdmin} setCart={setCart} />}></Route>
            </Routes>
        </div>
    );
};