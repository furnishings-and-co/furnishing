const client = require('./client')

async function getAllPurchased(cartId){
    try {
      const { rows } = await client.query(`
      SELECT * FROM purchased_items
      LEFT JOIN products ON purchased_items."productId" = products."id"
      WHERE purchased_items."cartId" = $1
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