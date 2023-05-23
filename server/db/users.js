const client = require("./client");
const jwt = require("jsonwebtoken");
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

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, "your-secret-key");

    return { user, token };
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
 try{
  const payload = await jwt.verify(token, jwt);
  const SQL = `
    SELECT users.*
    FROM users
    WHERE id = $1 
  `;
  const response = await client.query(SQL, [ payload.id]);
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

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getUserByToken,
 
};
