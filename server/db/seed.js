const client = require('./client');
const { createProduct } = require('./products');

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
  console.log("Starting to build tables...");
  // create all tables, in the correct order
  try {
    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE users (
        id	SERIAL	PRIMARY KEY,
        email	VARCHAR(255)	UNIQUE NOT NULL,
        password	VARCHAR(255)	NOT NULL
      );
      CREATE TABLE products (
        id	SERIAL	PRIMARY KEY,
        name VARCHAR(255)	UNIQUE NOT NULL,
        price DECIMAL	NOT NULL,
        description	TEXT	NOT NULL,
        picture TEXT NOT NULL
        );
        CREATE TABLE purchased_items (
          id SERIAL PRIMARY KEY,
          user_id INT,
          product_id INT,
          name VARCHAR(255)	UNIQUE NOT NULL,
          price DECIMAL(10, 2),
          description	TEXT	NOT NULL,
          picture TEXT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (product_id) REFERENCES products(id)
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
      { username: "albert", password: "bertie99" },
      { username: "sandra", password: "sandra123" },
      { username: "glamgal", password: "glamgal123" },
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
        picture: "/img/chair1.webp"
      },
      {
        name: "Dinning Chair",
        description: "White chair with black legs.",
        price: 334.94,
        picture: "/img/chair2.jpg"
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
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
  } catch (error) {
    console.error('Error during rebuildDB', error);
    throw error;
  } finally {
    await client.end();
    console.log("Database has been rebuilt, and you're good to go!");
  }
};

rebuildDB();
