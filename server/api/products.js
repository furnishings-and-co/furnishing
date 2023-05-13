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

productRouter.get("/", async (req, res, next) => {
    try {
      const products = await getAllProducts();
      res.send(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

productRouter.get("/:productsId/routines", async (req, res, next) => {
    const { category } = req.params;
  
    try {
      const productCategory = await getProductsByCategory(category);
  
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
