import React from "react";
import { createProduct } from "../../../server/db";

const BASE_URL = "http://localhost:8080/api";

const AddProduct = ({ token, name, description, price, picture, category }) => {
  const handleAdd = async () => {
    try {
      const newProduct = {
        name,
        description,
        price,
        picture,
        category,
      };

      const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const createdProduct = await response.json();

      console.log("Product created:", createdProduct);
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const createProductAndHandleAdd = async () => {
    try {
      const createdProduct = await createProduct({
        name,
        description,
        price,
        picture,
        category,
      });

      console.log("Product created:", createdProduct);

      // Call handleAdd after createProduct to perform additional logic if needed
      handleAdd();
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  createProductAndHandleAdd();

  return <button>Add Product</button>;
};

export default AddProduct;
