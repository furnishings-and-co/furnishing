import React, { useState } from "react";
import { loginUser } from "../api/users";
import { registerUser } from "../api/users";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ setToken, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await registerUser(username, password);
    localStorage.setItem("token", token);
    setToken(token);
    setUsername("");
    setPassword("");
    onClose(false)
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const token = await loginUser(username, password);
    localStorage.setItem("token", token);
    setToken(token);
    setUsername("");
    setPassword("");

    if (token) {
      navigate("/");
      onClose(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="loginCard">
      <div className="cardHeader">
        <div className="log">{isLogin ? "Log In" : "Register"}</div>
        <div className="close-button-nav" onClick={onClose}>
          X
        </div>
      </div>
      {isLogin ? (
        <form className="loginForm" onSubmit={handleLogin}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Username"
            className="username"
          ></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="username"
          ></input>
          <button type="submit" className="loginButton">
            Login
          </button>
        </form>
      ) : (
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Username"
            className="username"
          ></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="username"
          ></input>
          <button type="submit" className="loginButton">
            Register
          </button>
        </form>
      )}
      <div id="createOne">
        <button onClick={toggleForm}>
          {isLogin
            ? "Don't have an account? Create one"
            : "Already have an account? Log in"}
        </button>
      
      </div>
    </div>
  );
};

export default Login;