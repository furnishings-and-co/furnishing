const express = require('express');
const {
    createProduct,
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

productsRouter.get("/:productsId/routines", async (req, res, next) => {
    const { productsId } = req.params;
  
    try {
      const productCategory = await getproductsByCategory(category);
    //   const routines = await getPublicRoutinesByproducts({ id: productsId });
  
      res.send(productCategory);
    } catch (error) {
      next(error);
    }
  });
