const client = require('./client')
const { isAdmin } = require("./users")


async function createProduct({ name, description, price, picture, category }) {
  try {

    await client.connect();

    const query = 'INSERT INTO products (name, description, price, picture, category) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, description, price, picture, category];

    const result = await client.query(query, values);
    const createdProduct = result.rows[0];

    

    console.log('Product created:', createdProduct);
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
console.log("hello", rows);
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
      
    }
}



// async function editProduct(
//   productId,
//   name,
//   description,
//   price,
//   picture,
//   category,
//   userId
// ) {
//   try {
//     const isAdminUser = await isAdmin(userId);
//     if (!isAdminUser) {
//       throw new Error("Only admin users can edit products.");
//     }

//     const query = `
//       UPDATE products
//       SET name = $1, description = $2, price = $3, picture = $4, category = $5
//       WHERE id = $6
//       RETURNING *;
//     `;

//     const values = [name, description, price, picture, category, productId];

//     const result = await client.query(query, values);
//     const updatedProduct = result.rows[0];

//     console.log("Product updated:", updatedProduct);
//     return updatedProduct;
//   } catch (error) {
//     console.error("Error editing product:", error);
//     throw error;
//   }
// }


// async function removeProduct(productId, userId) {
//   try {
//     const isAdminUser = await isAdmin(userId);
//     if (!isAdminUser) {
//       throw new Error("Only admin users can remove products.");
//     }

//     const query = "DELETE FROM products WHERE id = $1 RETURNING id";
//     const values = [productId];

//     const result = await client.query(query, values);
//     const removedProductId = result.rows[0].id;

//     console.log("Product removed:", removedProductId);
//     return removedProductId;
//   } catch (error) {
//     console.error("Error removing product:", error);
//     throw error;
//   }
// }

module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
  getProductsByCategory,
};