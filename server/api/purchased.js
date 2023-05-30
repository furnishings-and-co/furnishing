const express = require('express')
const purchasedRouter = express.Router();
const { addCartToHistory, getUserByToken, getAllPurchased } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

purchasedRouter.get("/:cartId", async (req, res, next) => {
  try {
      console.log("getting to purchased router")
  const { cartId } = req.params;
  console.log("cartID", cartId)
    const purchased_items = await getAllPurchased(cartId);
    console.log(purchased_items);
    res.send(purchased_items);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

purchasedRouter.post('/:cartId', async (req, res) => {
    console.log("getting to purchased router")
    const { cartId } = req.params;
    const token = req.headers.authorization.split(" ")[1]
    const user = await getUserByToken(token);
    if (!user) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }
    console.log("req.params", req.params);
    console.log("route cartid", cartId);
    const cart = await addCartToHistory({ cartId });
    res.send(cart);
  });
  
  module.exports = purchasedRouter;