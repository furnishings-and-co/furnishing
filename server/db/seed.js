const { addProductToCart } = require('../../client/src/api/cart');
const client = require('./client');
const { createProduct } = require('./products');
const { createUser } = require('./users');

const dropTables = async () => {
  try {
    console.log('Starting to drop all tables...');
    await client.query(`
    DROP TABLE IF EXISTS purchased_items;
    DROP TABLE IF EXISTS cart;
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
      CREATE TABLE cart (
        id SERIAL PRIMARY KEY,
        "userId" INT REFERENCES users(id),
        "productId" INT REFERENCES products(id),
        quantity INT
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
    console.log("hi")
    const users = await Promise.all(usersToCreate.map(user => createUser(user.username, user.password)));

    
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

const productsToCreate=[
  { 

    name: "BohemianBreeze", 

    description: "Bohemian-inspired woven rattan chair with a comfortable cushion.", 

    price: 199.99, 

    picture: "/img/chair7.jpg", 

    category: "chair" 

  }, 

  { 

    name: "VersatileVanity", 

    description: "Elegant vanity chair with a padded seat and mirrored accents.", 

    price: 129.99, 

    picture: "/img/chair8.webp", 

    category: "chair" 

  }, 

  { 

    name: "Grey Bliss", 

    description: "Grey sectional Couch", 

    price: 294.94, 

    picture: "/img/couch1.webp", 

    category: "couch" 

  }, 

  { 

    name: "Modern Minimalist", 

    description: "Sleek and minimalist white leather couch with clean lines.", 

    price: 599.99, 

    picture: "/img/couch2.webp", 

    category: "couch" 

  }, 
  { 

    name: "Standard Lamp", 

    description: "Really Really Bright", 

    price: 50.99, 

    picture: "/img/light1.jpg", 

    category: "light" 

  }, 

  { 

    name: "Elegant Chandelier", 

    description: "Crystal chandelier with intricate design and sparkling lights.", 

    price: 299.99, 

    picture: "/img/light2.jpg", 

    category: "light" 

  }, 

  { 

    name: "Glamorous Vanity Table", 

    description: "Glamorous vanity table with a mirrored surface and elegant design.", 

    price: 349.99, 

    picture: "/img/table8.webp", 

    category: "table" 

  }, 

  { 

    name: "Minimalist Writing Desk", 

    description: "Minimalist writing desk with clean lines and a spacious work area.", 

    price: 299.99, 

    picture: "/img/table9.webp", 

    category: "table" 

  }, 
  { 

    name: "Farmhouse Dining Table", 

    description: "Charming farmhouse-style dining table with a reclaimed wood look.", 

    price: 699.99, 

    picture: "/img/table7.webp", 

    category: "table" 

  }

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







