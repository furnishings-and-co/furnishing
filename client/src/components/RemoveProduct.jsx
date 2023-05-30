import { removeProduct } from "../../../server/db";
import React from "react";
const BASE_URL = "http://localhost:8080/api";

const RemoveProduct = ({ id, token }) => {
  const handleRemove = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove product");
      }

      const result = await response.json();
      const removedProductId = await removeProduct(result.id);

      console.log("Product removed:", removedProductId);
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  handleRemove();

  return <button>Remove Product</button>;
};

export default RemoveProduct;
