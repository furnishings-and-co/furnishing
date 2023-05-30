const express = require('express');
const cartRouter = express.Router();
const { getCartByUserId, getUserByToken, addProductToCart, deleteProductFromCart, clearCart } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

cartRouter.use((req, res, next) => {
    console.log("A request is being made to /cart");
    next();
  });

//Get cart by userId /api/cart/:id
  cartRouter.get('/:userId', async (req, res) => {
    console.log("got to /api/cart/:id")
    const { userId } = req.params;
    console.log("req.params", req.params);
    console.log("route id",userId);
    const cart = await getCartByUserId({ id: userId });
    res.send(cart);
  });

  // post /api/cart/:productId
  cartRouter.post('/:productId', async (req, res) => {
    const { productId } = req.params;
    const token = req.headers.authorization.split(" ")[1]
    const user = await getUserByToken(token);
    if (!user) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }
    const cart = await getCartByUserId({ id: user.id });
    await addProductToCart({ cartId: cart.id, productId });
    const updatedCart = await getCartByUserId({ id: user.id });
    res.send(updatedCart);
  });

  cartRouter.post('/clear/checkout', async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    console.log("token /clear", token)
    const user = await getUserByToken(token);
    console.log(" user /clear", user)
  if (!user) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
    const cart = await getCartByUserId({ id: user.id });
    console.log("cart /clear", cart)
   const newCart = await clearCart({ cartId: cart.id, userId: user.id });
    console.log("newcart /clear", newCart)
    res.send(newCart);
  });
  

  //delete /api/cart/:productId

  cartRouter.delete('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const token = req.headers.authorization.split(" ")[1]
    const user = await getUserByToken(token);
  if (!user) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
  const cart = await getCartByUserId({ id: user.id });
  await deleteProductFromCart({ cartId: cart.id, productId });
  const updatedCart = await getCartByUserId({ id: user.id });
  res.send(updatedCart);
  })

  
module.exports = cartRouter;