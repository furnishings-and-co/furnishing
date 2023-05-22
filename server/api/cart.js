const express = require('express');
const cartRouter = express.Router();
const { getCart, removeProductFromCart, addProductToCart } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

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
cartRouter.post('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;
        const addProduct = await addProductToCart(userId, productId);
        console.log(addProduct)
        res.send(addProduct);
    } catch (error) {
        next(error);
    }
})