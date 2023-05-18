const client = require('./client');
const { createProduct } = require('./products');
const { createUser } = require('./users');

const dropTables = async () => {
  try {
    console.log('Starting to drop all tables...');
    await client.query(`
    DROP TABLE IF EXISTS purchased_items;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    `);
    console.log('Finished droppping all tables successfully!');
  } catch (error) {
    console.error('Error dropping tables');
    throw error;
  }
};

async function createTables() {
  // create all tables, in the correct order
  try {
    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT FALSE
      );
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        price DECIMAL NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(255) NOT NULL,
        picture TEXT NOT NULL
      );
      CREATE TABLE purchased_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        price DECIMAL(10, 2),
        description TEXT NOT NULL,
        picture TEXT NOT NULL,
        "userId" INTEGER REFERENCES users (id),
        "productId" INTEGER REFERENCES products (id)
      );
    `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    const usersToCreate = [
      { username: "albert", password: "bertie99", isAdmin: false },
      { username: "sandra", password: "sandra123", isAdmin: false },
      { username: "glamgal", password: "glamgal123", isAdmin: false },
      { username: "admin", password: "admin123", isAdmin: true }
    ]
    const users = await Promise.all(usersToCreate.map(createUser))

    console.log("Users created:")
    console.log(users)
    console.log("Finished creating users!")
  } catch (error) {
    console.error("Error creating users!")
    throw error
  }
}

async function createInitialProducts() {
  try {
    console.log("Starting to create products...")

    const productsToCreate = [
      {
        name: "Grey Forest",
        description: "Wooden grey chair.",
        price: 227.24,
        picture: "/img/chair1.webp",
        category: "chair"

      },
      {
        name: "Dinning Chair",
        description: "White chair with black legs.",
        price: 334.94,
        picture: "/img/chair2.jpg",
        category: "chair"
      },
      {
        name: "Grey Bliss",
        description: "Grey sectional Couch",
        price: 294.94,
        picture: "/img/couch1.webp",
        category: "couch"
      },
    ]
    const products = await Promise.all(productsToCreate.map(createProduct))

    console.log("products created:")
    console.log(products)

    console.log("Finished creating products")
  } catch (error) {
    console.error("Error creating products")
    throw error
  }
}
const rebuildDB = async () => {
  try {
    await dropTables();
    console.log("dropped tables")
    await createTables();
    console.log("created tables")
    await createInitialUsers();
    console.log("createdUsers tables")
    await createInitialProducts();
    console.log("createdProducts tables")
  } catch (error) {
    console.error('Error during rebuildDB', error);
    throw error;
  } finally {
    await client.end();
    console.log("Database has been rebuilt, and you're good to go!");
  }
};

rebuildDB();
