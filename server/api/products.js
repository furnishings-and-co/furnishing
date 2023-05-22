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
   console.log (category, "hello")
    try {
      const productCategory = await getProductsByCategory(category);
  console.log(productCategory)
      res.send(productCategory);
    } catch (error) {
      next(error);
    }
  });

  productRouter.get("/single/:id", async (req, res, next) => {
    const { id } = req.params;
  console.log(id, "productID")
    try {
      const singleProduct = await getProductsById(id);
      res.send(singleProduct);
    } catch (error) {
      next(error);
    }
  });

module.exports = productRouter;