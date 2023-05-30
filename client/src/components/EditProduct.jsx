import { editProduct } from "../../../server/db";
import React from "react";
const BASE_URL = "http://localhost:8080/api";

const EditProduct = ({
  id,
  token,
  updatedName,
  updatedDescription,
  updatedPrice,
  updatedPicture,
  updatedCategory,
}) => {
  const handleEdit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      const product = await response.json();

      const updatedProduct = await editProduct(
        id,
        updatedName,
        updatedDescription,
        updatedPrice,
        updatedPicture,
        updatedCategory
      );

      console.log("Product updated:", updatedProduct);
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return <button onClick={handleEdit}>Edit Product</button>;
};

export default EditProduct;