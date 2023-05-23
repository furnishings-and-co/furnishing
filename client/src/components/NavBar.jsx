import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/NavBar.css"

const NavBar = ({token,setToken, setUser, user}) => {
    console.log(user)
    return (
        <div className='Navbar'>
            <img className="logo" src="./img/logo.png" />
            <ul className='Links'>
                <Link className='Link' to="/" >Home</Link>
                <Link className='Link' to="/products">Shop</Link>
                <Link className='Link' to="/cart">Cart</Link>
                <Link className='Link' to="/products/me">Profile</Link>
                <Link className='Link' to="/login">Login</Link>
            </ul>

        </div>
    );
};

export default NavBar;