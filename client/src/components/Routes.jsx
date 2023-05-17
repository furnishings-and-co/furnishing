import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllProducts from './AllProducts';
import Home from './Home';

export const RRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path= "/" element= {<Home/>}></Route>
                <Route path="/products" element={<AllProducts/>}> </Route>
            </Routes>
        </div>
    );
};