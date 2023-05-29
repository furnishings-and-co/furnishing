const client = require('./client')

async function getAllPurchased(cartId){
    try {
      const { rows } = await client.query(`
        SELECT * FROM purchased_items
        WHERE "cartId" = $1
        `, [cartId]);
  console.log("purchaseproducts", rows);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  module.exports = {
   getAllPurchased
  };