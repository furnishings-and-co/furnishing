async function createCart({ userId, productId, name, description, price, picture }) {
    try {
      const {
        rows: [cart],
      } = await client.query(
        `
    INSERT INTO products("userId", "productId", name, description, price, picture) 
    VALUES($1, $2, $3, $4, $5, $6) 
    RETURNING *;
  `,
        [userId, productId, name, description, price, picture]
      );
  
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async function getCart() {
    try {
      const {
        rows: [cart],
      } = await client.query(
        `
    SELECT name, price, description, picture
    FROM purchased_items 
    WHERE userId = $1 AND productId = $2;
    `)
    return cart;
  } catch (error) {
    console.log(error);
  }
}

async function removeProductFromCart({ productId }) {
  try {
    // Delete product from purchased_items
     const {rows} = await client.query(
      `
      DELETE FROM purchased_items
      WHERE "productId" = $1
      RETURNING *;
    `,
      [productId]
    );
    return rows;
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error);
  }
}

async function clearCart() {
  try {
    const {rows} = await client.query(`TRUNCATE purchased_items`);
    return rows;
  } catch (error) {
    console.log(error);
  }
}
  module.exports = {createCart, getCart, removeProductFromCart, clearCart};