const express = require('express');
const {
    getAllProducts,
    getProductsById,
    getProductsByCategory,
    addProductToCart
  } = require('../db');
const productRouter = express.Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env 

// api/products
productRouter.get("/", async (req, res, next) => {
    try {
      const products = await getAllProducts();
      console.log(products);
      res.send(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

productRouter.get("/:category", async (req, res, next) => {
    const { category } = req.params;
   console.log (category)
    try {
      const productCategory = await getProductsByCategory(category);
  console.log(productCategory)
      res.send(productCategory);
    } catch (error) {
      next(error);
    }
  });

  productRouter.get("/:productId", async (req, res, next) => {
    const { productId } = req.params;
  
    try {
      const getSingleProduct = await getProductsById(productId);
      res.send(getSingleProduct);
    } catch (error) {
      next(error);
    }
  });

module.exports = productRouter;