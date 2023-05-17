import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllProducts from './AllProducts';
import Home from './Home';
import Login from './Login';

export const RRoutes = ({token, setToken, user, setUser}) => {
    return (
        <div>
            <Routes>
                <Route path= "/" element= {<Home token={token} setToken={setToken} setUser={setUser} user={user}/>}></Route>
                <Route path="/products" element={<AllProducts token={token} setToken={setToken} setUser={setUser} user={user}/>}> </Route>
                <Route path="/login" element={<Login token={token} setToken={setToken} setUser={setUser} user={user}/>}></Route>
            </Routes>
        </div>
    );
};