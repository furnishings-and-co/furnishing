const express = require('express');
const router = express.Router();
const { getCart, removeProductFromCart, addProductToCart } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

// Get cart items /api/cart
router.get('/', async (req, res, next) => {
try {
    const cart = await getCart();
    res.send(cart);
} catch (error) {
    console.log(error)
}
})

// delete item from cart /api/cart/:productId
router.delete('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const removeProduct = await removeProductFromCart(productId);
        res.send(removeProduct);
    } catch (error) {
        next(error);
    }
})

//add product to cart /api/cart/:productId
router.post('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const addProduct = await addProductToCart(productId);
        res.send(addProduct);
    } catch (error) {
        next(error);
    }
})