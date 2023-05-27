const BASE_URL = "api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*
Registers a new user with the API.
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

/*
Logs in an existing user with the API.
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

/*
 Fetches the details of the currently logged-in user from the API.
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
    return result;
  } catch (err) {
    console.error(err);
  }
};

/*
 Fetches the user's isAdmin value from the Database based on the provided username and password
 */
export const checkAdmin = async () => {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return;
  }
  try {
    const response = await fetch(`${BASE_URL}/users/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching isAdmin value");
    }

    const isAdmin = await response.json();

    return isAdmin;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/*
 Logs out the user by removing their JWT token from local storage and clearing their user data.
 */
export const logout = (setToken, setUser) => {
  localStorage.removeItem("token");
  localStorage.clear();
  setToken(null);
  setUser({});
};
