const { Client } = require('pg');
const pkg = require('../../package.json');
const { DATABASE_URL } = process.env;

async function createProduct({ name, description, price, picture, category }) {
  try {
    const client = new Client({
      connectionString: `postgres://localhost:5432/${pkg.name}`,
    });

    await client.connect();

    const query = 'INSERT INTO products (name, description, price, picture, category) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, description, price, picture, category];

    const result = await client.query(query, values);
    const createdProduct = result.rows[0];

    await client.end();

    console.log('Product created:', createdProduct);
    return createdProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

async function getAllProducts(){
  
  try {
    const { rows: products } = await client.query(`
      SELECT * FROM products
    `);
    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductsById(id){

    try {
      const {rows: [products] } = await client.query(`
      SELECT * FROM products
      WHERE id = $1
      `, [id]
      );
      return product;
    } catch (error) {
      throw error;
  }
}

async function getProductsByCategory(category){
    try {
      const {rows: products } = await client.query(`
      SELECT * FROM products
      WHERE category = $1
      ` [category]
      );
      return products;
    } catch (error) {
      
    }
}

async function addProductToCart(userId, productId) {
  try {
    const {
      rows: [selectedItem],
    } = await client.query(
      `
      INSERT INTO purchased_items ("userId", "productId", name, price, description, picture, category)
      SELECT $1, $2, name, price, description, picture, category
      FROM products
      WHERE id = $2
      RETURNING *;
    `,
      [userId, productId]
    );

    return selectedItem;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
  getProductsByCategory,
  addProductToCart
};