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
    console.log("response in getcartby user", id)
    const productsResponse = await client.query(productsSQL, [cart.id]);
    cart.products = productsResponse.rows;
    return cart;
  };

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
  // if rows.length use line 61
  await client.query(SQL, [productId, cartId]);
  return;
};
const addCartToHistory = async ({cartId}) => {
  try {
    // Insert products from cart_products into purchased_items
    const result = await client.query(`
      INSERT INTO purchased_items ("cartId", "productId", quantity)
      SELECT "cartId", "productId", quantity
      FROM cart_products
      WHERE "cartId" = $1
      RETURNING *
    `, [cartId]);

  } catch (error) {
    console.error('Error adding products to purchased_items:', error);
  }
}

const clearCart = async ({ cartId, userId }) => {
  const SQL = `
  UPDATE cart
  SET "isActive" = false
  WHERE id = $1
  `;
  await client.query(SQL, [cartId]);
  const newCart = await createCart(userId);
  return newCart;
};

  module.exports = {
   createCart,
   getCartByUserId,
   addProductToCart,
   deleteProductFromCart,
   addCartToHistory,
   clearCart
  };


