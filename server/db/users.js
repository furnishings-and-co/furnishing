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

// async function isAdmin(userId) {
//   try {
//     const {
//       rows: [users],
//     } = await client.query(
//       `
//       SELECT *
//       FROM users
//       WHERE isAdmin = true;
//       `,
//       [userId]
//     );
//     if (!user) {
//       return false;
//     }
//     await createProduct();
//     await removeProduct();
//     await editProduct();
//     return users.isAdmin;
//   } catch (error) {
//     console.error("Error checking isAdmin");
//   }
// }

// async function testProductFunctions() {
//   try {
//     // Test isAdmin
//     const userId = 1; // Provide a valid user ID for testing
//     const isAdminUser = await isAdmin(userId);
//     console.log("Is Admin:", isAdminUser);

//     // Test removeProduct
//     const productId = 1; // Provide a valid product ID for testing
//     const removedProductId = await removeProduct(productId, userId);
//     console.log("Removed Product ID:", removedProductId);

//     // Test editProduct
//     const updatedProduct = await editProduct(
//       productId,
//       "Updated Product",
//       "This is an updated product",
//       19.99,
//       "updated.jpg",
//       "Updated Category",
//       userId
//     );
//     console.log("Updated Product:", updatedProduct);
//   } catch (error) {
//     console.error("Error in product functions:", error);
//   }
// }

// testProductFunctions();

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  isAdmin,
};
