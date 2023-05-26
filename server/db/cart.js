const client = require('./client')
// get cart by user id

// create cart
const createCart = async (userId) => {
    console.log("create cart id", userId)
    const SQL = `
      INSERT INTO cart("userId")
      VALUES($1) RETURNING *
    `;
    const response = await client.query(SQL, [userId]);
    return response.rows[0];
  };

const getCartByUserId = async ({ id }) => {
    const SQL = `
      SELECT * FROM cart
      WHERE "userId" = $1 AND "isActive" = true;
    `;
    const response = await client.query(SQL, [id]);
    const cart = response.rows[0];
    // get products, and attach to cart
    const productsSQL = `
    SELECT * FROM cart_products
    LEFT JOIN products ON cart_products."productId" = products."id"
    WHERE cart_products."cartId" = $1
    `;
    const productsResponse = await client.query(productsSQL, [cart.id]);
    cart.products = productsResponse.rows;
    return cart;
  };

//   async function addProductToCart(userId, productId, quantity) {
//   try {
//     const {
//       rows: [selectedItem],
//     } = await client.query(
//       `
//       INSERT INTO cart ("userId")
//       VALUES ($1, $2, $3)
//       RETURNING *;
//     `,
//       [userId, productId, quantity]
//     );
//       console.log(selectedItem)
//     return selectedItem;
//   } catch (error) {
//     console.log(error);
//   }
// }

const addProductToCart = async ({ cartId, productId }) => {
  // check if product is already in cart
  const checkSQL = `
    SELECT * FROM cart_products
    WHERE "cartId" = $1 AND "productId" = $2
  `;
  const checkResponse = await client.query(checkSQL, [cartId, productId]);
  if (checkResponse.rows.length) {
    await client.query(
      `UPDATE cart_products SET quantity = quantity + 1 WHERE "cartId" = $1 AND "productId" = $2`,
      [cartId, productId]
    );
    return;
  }

  const SQL = `
    INSERT INTO cart_products("productId", "cartId")
    VALUES($1, $2)
    RETURNING *
    `;
  await client.query(SQL, [productId, cartId]);
  return;
};

const deleteProductFromCart = async ({ cartId, productId }) => {
  const SQL = `
    DELETE FROM cart_products
    WHERE "cartId" = $2 AND "productId" = $1
  `;
  await client.query(SQL, [productId, cartId]);
  return;
};

  module.exports = {
   createCart,
   getCartByUserId,
   addProductToCart,
   deleteProductFromCart
  };


// async function removeProductFromCart({ productId }) {
//   try {
//     // Delete product from cart
//      const {rows} = await client.query(
//       `
//       DELETE FROM cart
//       WHERE "productId" = $1
//       RETURNING *;
//     `,
//       [productId]
//     );
//     return rows;
//   } catch (error) {
//     await client.query("ROLLBACK");
//     console.log(error);
//   }
// }

// async function clearCart() {
//   try {
//     const {rows} = await client.query(`TRUNCATE cart`);
//     return rows;
//   } catch (error) {
//     console.log(error);
//   }
// }

//   module.exports = {getCart, removeProductFromCart, clearCart, addProductToCart};