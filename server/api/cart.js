const express = require('express');
const cartRouter = express.Router();
const { getCartByUserId, getUserByToken, addProductToCart, deleteProductFromCart } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

cartRouter.use((req, res, next) => {
    console.log("A request is being made to /cart");
    next();
  });
// cartRouter.get('/', (req, res, next) => {
//   // console.log("hello")
// })

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
// Get cart items /api/cart
// cartRouter.get('/', async (req, res, next) => {
// try {
//     const cart = await getCart();
//     res.send(cart);
// } catch (error) {
//     console.log(error)
// }
// })

// delete item from cart /api/cart/:productId
// cartRouter.delete('/:productId', async (req, res, next) => {
//     try {
//         const { productId } = req.params;
//         const removeProduct = await removeProductFromCart(productId);
//         res.send(removeProduct);
//     } catch (error) {
//         next(error);
//     }
// })

//add product to cart /api/cart/:productId

// cartRouter.post('/add', async (req, res, next) => {
//     console.log("hello")
//     try {
//         const { userId, productId, quantity } = req.body;
//         console.log(userId, productId, quantity)
//         const addProduct = await addProductToCart(userId, productId, quantity);
//         console.log(addProduct)
//         res.send(addProduct);
//     } catch (error) {
//         next(error);
//     }
// })

// cartRouter.post('/add', async (req, res) => {
//     try {
//       const { userId, productId, quantity } = req.body;
  
//       // Perform database query to insert the product into the cart
//       const query = `
//         INSERT INTO cart ("userId", "productId", quantity)
//         VALUES ($1, $2, $3)
//         RETURNING *;
//       `;
  
//       const values = [userId, productId, quantity];
  
//       const result = await client.query(query, values);
//       const addedProduct = result.rows[0];
  
//       res.json(addedProduct);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred while adding the product to the cart.' });
//     }
//   });

module.exports = cartRouter;