const BASE_URL= "http://localhost:8080/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


/**
 * Registers a new user with the API.
 * @param {string} username The desired username for the new user.
 * @param {string} password The desired password for the new user.
 * @returns {Promise<string>} The JWT token for the newly registered user.
 */
export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    console.log(response, username, password);
    if (result.token) {
      toast.success(`Welcome to Furnishings & Co ${username}!`, {
        position: "bottom-center",
        autoClose: 3000,
        style: {
          fontSize: "16px",
        },
      });
      return result.token;
    } else {
      toast.error(result.message || "Registration failed. Please try again.", {
        position: "bottom-center",
        autoClose: 3000,
        style: {
          fontSize: "16px",
        },
      });
    }
  } catch (err) {
    console.error(err);
  }
};


/**
 * Logs in an existing user with the API.
 * @param {string} username The username of the existing user.
 * @param {string} password The password of the existing user.
 * @returns {Promise<string>} The JWT token for the logged-in user.
 */
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();


    if (result.token) {
      toast.success(`Welcome back to Furnishings & Co ${username}!`, {
        position: "bottom-center",
        autoClose: 3000,
        style: {
          fontSize: "16px",
        },
      });
      return result.token;
    } else {
      toast.error(result.message || "Log in failed. Please try again.", {
        position: "bottom-center",
        autoClose: 3000,
        style: {
          fontSize: "16px",
        },
      });
    }
  } catch (err) {
    console.error(err);
  }
};


/**
 * Fetches the details of the currently logged-in user from the API.
 * @param {string} token The JWT token for the logged-in user.
 * @returns {Promise<Object>} The user object.
 */
export const fetchMe = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Fetches the user's isAdmin value from the Database based on the provided username and password
 * @param {string} username The username of the user
 * @param {string} password The password of the user
 * @return {Promise<boolean>} A Promise that resolves to the isAdmin value
 */
export const checkAdmin = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Error fetching isAdmin value');
    }

    const data = await response.json();
    const isAdmin = data.isAdmin;

    return isAdmin;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


/**
 * Logs out the user by removing their JWT token from local storage and clearing their user data.
 * @param {function} setToken A state setter function to set the JWT token to null.
 * @param {function} setUser A state setter function to set the user data to an empty object.
 */
export const logout = (setToken, setUser) => {
  localStorage.removeItem("token");
  localStorage.clear();
  setToken(null);
  setUser({});
};