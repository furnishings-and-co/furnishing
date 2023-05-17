import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/NavBar.css"

const NavBar = () => {
    return (
        <div className='Navbar'>
            <h3 className='logo'>Furnishings & Co</h3>
            <ul className='Links'>
                <Link to="/" >Home</Link>
                <Link to="/products">Shop</Link>
                {/* <Link to="/cart">Cart</Link>
                <Link to="/profile">Profile</Link> */}
                <Link to="/login">Login</Link>
            </ul>

        </div>
    );
};

export default NavBar;