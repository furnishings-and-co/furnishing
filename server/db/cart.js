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