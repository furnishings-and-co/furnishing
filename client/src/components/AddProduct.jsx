import React, { useState } from "react";
import { createAdminProduct } from "../api/admin";
// import { createProduct } from "../../../server/db/products";
const BASE_URL = "http://localhost:8080/api";


const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState("");
  const [category, setCategory] = useState("");
 
const handleSubmit = async(e) => {
    e.preventDefault();
    await createAdminProduct(name, description, price, picture, category )
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
