import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/NavBar.css"
import { logout } from '../api/users'


const NavBar = ({token, setToken, setUser, user}) => {
    
    const handleLogout = async (e) => {
        e.preventDefault();
        await logout(setToken, setUser);
      };    
    return (
        <div className='Navbar'>
            <img className="logo" src="./img/logo.png" />
            <ul className='Links'>
                <Link className='Link' to="/" >Home</Link>
                <Link className='Link' to="/products">Shop</Link>
                <Link className='Link' to="/cart">Cart</Link>
                {token ? <Link className='Link' to="/products/me">Profile</Link> : null}
                {!token ? <Link className='Link' to="/login">Login</Link> : null}
                {token ? <button onClick={handleLogout}>LOGOUT</button> : null}
            </ul>

        </div>
    );
};

export default NavBar;