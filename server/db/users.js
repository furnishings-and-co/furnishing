const client = require('./client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

async function createUser(username, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const query = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING id, username;
    `;
    const values = [username, hashedPassword];
    const result = await client.query(query, values);
    
    const user = result.rows[0];
    
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, 'your-secret-key');
    
    return { user, token };
  } catch (error) {
    console.error('Error creating user', error);
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
    console.error('Error getting user', error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {rows: [user]} = await client.query(`
    SELECT id, username, "isAdmin"
    FROM users
    WHERE id = $1;
    `, [userId]);

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

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
