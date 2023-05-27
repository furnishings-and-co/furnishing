const express = require('express');
const cartRouter = express.Router();
const { getCartByUserId, getUserByToken, addProductToCart, deleteProductFromCart, clearCart } = require('../db');

cartRouter.use((req, res, next) => {
    console.log("A request is being made to /cart");
    next();
  });

//Get cart by userId /api/cart/:id
  cartRouter.get('/:userId', async (req, res) => {
    const { userId } = req.params;
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
    const user = await getUserByToken(token);
  if (!user) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
    const cart = await getCartByUserId({ id: user.id });
   const newCart = await clearCart({ cartId: cart.id, userId: user.id });
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