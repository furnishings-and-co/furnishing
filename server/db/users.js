const client = require('./client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser({ username, password, email, isAdmin = false }) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password, email, "isAdmin") 
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (username, email) DO NOTHING 
    RETURNING id, username, email;
    `,
      [username, hashedPassword, email, isAdmin]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);
    if (!user) return;

    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordsMatch) return;

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById() {
  
}

async function getUserByUsername() {}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
