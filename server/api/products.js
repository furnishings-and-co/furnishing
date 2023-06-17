const express = require('express');
const {
    getAllProducts,
    getProductsById,
    getProductsByCategory,
    createProduct,
    editProduct,
    removeProduct
  } = require('../db');
const productRouter = express.Router();


// api/products
productRouter.get("/", async (req, res, next) => {
    try {
      const products = await getAllProducts();
      res.send(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

productRouter.get("/:category", async (req, res, next) => {
    const { category } = req.params;
    try {
      const productCategory = await getProductsByCategory(category);
      res.send(productCategory);
    } catch (error) {
      next(error);
    }
  });

  productRouter.get("/single/:id", async (req, res, next) => {
    const { id } = req.params;
    console.log("products js 36", id)
    try {
      const singleProduct = await getProductsById(id);
      res.send(singleProduct);
    } catch (error) {
      next(error);
    }
  });

  // POST /api/products
productRouter.post('/admin/create', async (req, res) => {
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
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

productRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const removedProductId = await removeProduct(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = productRouter;