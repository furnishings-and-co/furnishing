import React, { useState } from "react";
// import { createProduct } from "../../../server/db/products";
const BASE_URL = "http://localhost:8080/api";
const AddProduct = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState("");
  const [category, setCategory] = useState("");
  const handleAdd = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Picture:</label>
        <input
          type="text"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};
export default AddProduct;
