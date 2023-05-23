import React, { useState } from 'react';
import { DisplayProducts } from '../api/products'
import { useEffect } from 'react';


import "../styles/Products.css"

import { productsToMap } from '../api/data';
import { useNavigate } from 'react-router-dom';
import { addProductToCart } from '../api/cart';

const AllProducts = ({setCart}) => {
  const navigate=useNavigate()
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([])
  useEffect(() => {
    async function getProducts() {
      const products = await DisplayProducts()
      setProducts(products)
    }
    getProducts();
  }, [])
  // const navigate=useNavigate
  const onClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div>
      <div className="category">
      <button onClick={() => onClick("chair")}>CHAIRS</button>
        <button onClick={() => onClick("couch")}>COUCHES</button>
        <button onClick={() => onClick("light")}>LIGHTS</button>
        <button onClick={() => onClick("table")}>TABLES</button>
      </div>
      <div>
        {filteredProducts.map((product) => {
          return (
            <div key={product.id}>
              <img style={{ height: "400px", }} src={product.picture} alt="" />
              <p>{product.name}</p>
              <p>Description: {product.description}</p>
              <p>${product.price}</p>
              <button onClick={async() =>{
                const newCart= await addProductToCart(product.id);
                setCart(newCart)
              }}>Add To Cart</button>
              <button onClick={() => navigate(`/products/single/${product.id}`)}>View Product</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllProducts