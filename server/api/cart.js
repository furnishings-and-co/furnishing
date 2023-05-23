const express = require('express');
const cartRouter = express.Router();
const {addProductToCart } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

// route to api/carts/:userId
cartRouter.get('/:userId', async (req,res)=>{
  const {userId}=req.params;
  const cart=await getCartByUserId({userId})
  res.send(cart)
})


