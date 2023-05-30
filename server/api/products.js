const express = require('express');
const {
    getAllProducts,
    getProductsById,
    getProductsByCategory,
    addProductToCart,
    createProduct,
    editProduct,
    removeProduct
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

  // POST /api/products
productRouter.post('/create', async (req, res) => {
  try {
    const { name, description, price, picture, category } = req.body;

    // Call the createProduct function from the backend
    const createdProduct = await createProduct({ name, description, price, picture, category });

    // Send the created product as the response
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

productRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, picture, category } = req.body;
  try {
    const updatedProduct = await editProduct(
      id,
      name,
      description,
      price,
      picture,
      category
    );
    console.log("Product updated:", updatedProduct);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

productRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const removedProductId = await removeProduct(id);
    console.log("Product removed:", removedProductId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = productRouter;