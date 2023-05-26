import { removeProduct, checkAdminByToken } from "../../../server/db";
import React from "react";
const BASE_URL = "http://localhost:8080/api";

const RemoveProduct = ({ id, token }) => {
  const checkAdmin = async () => {
    try {
      const isAdmin = await checkAdminByToken(token);

      if (isAdmin) {
        console.log("User is an admin");
        // Handle admin logic here
        const response = await fetch(`${BASE_URL}/products/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        const removedProductId = await removeProduct(result.id);
        console.log("Product removed:", removedProductId);
      } else {
        console.log("User is not an admin");
        // Handle non-admin logic here
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  checkAdmin();

  return <button>Remove Product</button>;
};

export default RemoveProduct;
