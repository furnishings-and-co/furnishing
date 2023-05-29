import React, { useState } from 'react';
import { DisplayProducts } from '../api/products'
import { useEffect } from 'react';


import "../styles/Products.css"

import { productsToMap } from '../api/data';
import { useNavigate } from 'react-router-dom';
import { addProductToCart } from '../api/cart';

const AllProducts = ({cart, setCart}) => {
  const navigate = useNavigate()
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
    <div className='section'>
      <div className="left">
        <button className='category' onClick={() => onClick(null)}>SHOP ALL</button>
        <button className='category' onClick={() => onClick("chair")}>CHAIRS</button>
        <button className='category' onClick={() => onClick("couch")}>COUCHES</button>
        <button className='category' onClick={() => onClick("light")}>LIGHTS</button>
        <button className='category' onClick={() => onClick("table")}>TABLES</button>

      </div>
      <div>
      {filteredProducts.map((product) => {
  return (
    <div className='right' key={product.id}>
      <div className='product-container'>
        <img className='image' style={{ height: "400px" }} src={product.picture} alt="" />
        <div className='info-container'>
          <p className='name'>{product.name}</p>
          <p className='description'>{product.description}</p>
          <div className='price-button-container'>
            <p className='price'>${product.price}</p>
            <div className='button-container'>
              <button onClick={async () => {
                const updatedCart = await addProductToCart(product.id);
                setCart(updatedCart);
              }}>Add to cart</button>
              <button className='button' onClick={() => navigate(`/products/single/${product.id}`)}>View Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})}


      </div>
    </div>
  );
}

export default AllProducts