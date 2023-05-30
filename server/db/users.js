// require('dotenv').config();
const client = require("./client");
const jwt = require("jsonwebtoken");
const {JWT_SECRET}=process.env;
const bcrypt = require("bcrypt");
const { createProduct, removeProduct, editProduct } = require("./products");
const SALT_COUNT = 10;


async function createUser(username, password, isAdmin) {
  try {
    
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const query = `
      INSERT INTO users (username, password, "isAdmin")
      VALUES ($1, $2, $3)
      RETURNING id, username, "isAdmin";
    `;
    const values = [username, hashedPassword, isAdmin];
    const result = await client.query(query, values);

    const user = result.rows[0];
    console.log("JWT Secret 1" , JWT_SECRET)
    
    // Generate JWT token
    if(JWT_SECRET){
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    return { user, token };}
    else{
      return{user}
    }
  } catch (error) {
    console.error("Error creating user", error);
    throw error;
  }
}

async function getUser(username, password) {
  try {
    const query = `
      SELECT *
      FROM users
      WHERE username = $1;
    `;
    const values = [username];
    const result = await client.query(query, values);
    if (result.rows.length === 0) {
      return null; // User not found
    }
    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null; // Incorrect password
    }
    return user;
  } catch (error) {
    console.error("Error getting user", error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT id, username, "isAdmin"
    FROM users
    WHERE id = $1;
    `,
      [userId]
    );

    if (!user) return null;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(userName) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT id, username, password
    FROM users
    WHERE username = $1;
    `,
      [userName]
    );

    if (!user) return null;

    return user;
  } catch (error) {
    console.error(error);
  }
}

const getUserByToken = async(token) => {
console.log("JWTSECRET", JWT_SECRET)
 try{
  const payload = await jwt.verify(token, JWT_SECRET);
  const SQL = `
    SELECT users.*
    FROM users
    WHERE id = $1 
  `;
  console.log("payload", payload)
  const response = await client.query(SQL, [ payload.userId]);
  if(!response.rows.length){
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const user = response.rows[0];
  delete user.password;
  return user; }
  catch (error) {
    console.error(error);
  }
}

async function checkAdminByToken(token) {
  try {
    const user = await getUserByToken(token);

    const SQL = `
      SELECT *
      FROM users
      WHERE "isAdmin" = true
    `;
    const response = await client.query(SQL);
    const users = response.rows;

    if (user.isAdmin === true) {
      console.log("User is an admin");
      return true; // User is an admin
    } else {
      console.log("User is not an admin");
      return false; // User is not an admin
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getUserByToken,
  // isAdmin,
};
