const express = require('express');
const cartRouter = express.Router();
const { getCart, removeProductFromCart, addProductToCart } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

cartRouter.use((req, res, next) => {
    console.log("A request is being made to /cart");
    next();
  });
// Get cart items /api/cart
cartRouter.get('/', async (req, res, next) => {
try {
    const cart = await getCart();
    res.send(cart);
} catch (error) {
    console.log(error)
}
})

// delete item from cart /api/cart/:productId
cartRouter.delete('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const removeProduct = await removeProductFromCart(productId);
        res.send(removeProduct);
    } catch (error) {
        next(error);
    }
})

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

cartRouter.post('/add', async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      // Perform database query to insert the product into the cart
      const query = `
        INSERT INTO cart ("userId", "productId", quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
  
      const values = [userId, productId, quantity];
  
      const result = await client.query(query, values);
      const addedProduct = result.rows[0];
  
      res.json(addedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while adding the product to the cart.' });
    }
  });