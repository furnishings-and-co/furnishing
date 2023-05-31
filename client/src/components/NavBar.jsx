import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/NavBar.css"
import { logout } from '../api/users'
import Login from './Login';


const NavBar = ({ token, setToken, setUser, user }) => {
    const navigate = useNavigate()
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [activeLink, setActiveLink] = useState(false)

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout(setToken, setUser);
        navigate('/')
    };

    const handleLoginModalClose = () => {
        setShowLoginModal(false);
    };

    const handleLoginModalOpen = () => {
        setShowLoginModal(true);
    };
    const handleLinkClick = (link) => {
        setActiveLink(link)
    }

    return (
        <div className='Navbar'>
            <img className="logo" src="./img/logo.png" />
            <ul className='Links'>
                <Link className={activeLink === "home" ? "active" : ""} 
                onClick={() => handleLinkClick("home")}
                to="/" >Home</Link>
                <Link className={activeLink === "shop" ? "active" : ""} 
                onClick={() => handleLinkClick("shop")}
                 to="/products">Shop</Link>
                {token ? <Link className={activeLink === "cart" ? "active" : ""} 
                onClick={() => handleLinkClick("cart")}
                 to="/cart">Cart</Link> : null}
                {token ? <Link className={activeLink === "profile" ? "active" : ""} 
                onClick={() => handleLinkClick("profile")} 
                to="/profile">Profile</Link> : null}
                {token ? (<p className="usernameN">{user.username}</p>) : (<button className='button' onClick={handleLoginModalOpen}>LOGIN</button>)}
                {showLoginModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <Login
                                setToken={setToken}
                                setUser={setUser}
                                onClose={handleLoginModalClose}
                                />
                        </div>
                    </div>
                )}
                {token ? <button className='button' onClick={handleLogout}>LOGOUT</button> : null}
            </ul>

        </div>
    );
};

export default NavBar;