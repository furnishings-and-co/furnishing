const client = require('./client');


async function createProduct({ name, description, price, picture, category }) {
  try {
    const query = 'INSERT INTO products (name, description, price, picture, category) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, description, price, picture, category];

    const result = await client.query(query, values);
    const createdProduct = result.rows[0];

    return createdProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

async function getAllProducts(){
  try {
    const { rows } = await client.query(`
      SELECT * FROM products
    `);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getProductsById(id) {
  try {
    const { rows: [product] } = await client.query(`
      SELECT * FROM products
      WHERE id = $1
    `, [id]);
    return product;
  } catch (error) {
    console.log("not working")
    throw error;
  }
}

async function getProductsByCategory(category){
    try {
      const {rows: products } = await client.query(`
      SELECT * FROM products
      WHERE category = $1
      `, [category]
      );
      return products;
    } catch (error) {
      console.log(error)
    }
}


async function editProduct(
  productId,
  name,
  description,
  price,
  picture,
  category
) {
  try {
    const query = `
      UPDATE products
      SET name = $1, description = $2, price = $3, picture = $4, category = $5
      WHERE id = $6
      RETURNING *;
    `;

    const values = [name, description, price, picture, category, productId];

    const result = await client.query(query, values);
    const updatedProduct = result.rows[0];

    
    return updatedProduct;
  } catch (error) {
    console.error("Error editing product:", error);
    throw error;
  }
}


async function removeProduct(productId) {
  try {
    const query = "DELETE FROM products WHERE id = $1 RETURNING id";
    const values = [productId];

    const result = await client.query(query, values);
    const removedProductId = result.rows[0].id;
    return removedProductId;
  } catch (error) {
    console.error("Error removing product:", error);
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
  getProductsByCategory,
  removeProduct,
  editProduct
};