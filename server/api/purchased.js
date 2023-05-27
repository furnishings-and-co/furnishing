const express = require('express')
const purchasedRouter = express.Router();
const { addCartToHistory, getUserByToken, getAllPurchased } = require('../db');

purchasedRouter.get("/:cartId", async (req, res, next) => {
  try {
  const { cartId } = req.params;
    const purchased_items = await getAllPurchased(cartId);
    res.send(purchased_items);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

purchasedRouter.post('/:cartId', async (req, res) => {
    const { cartId } = req.params;
    const token = req.headers.authorization.split(" ")[1]
    const user = await getUserByToken(token);
    if (!user) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }
    const cart = await addCartToHistory({ cartId });
    res.send(cart);
  });
  
  module.exports = purchasedRouter;