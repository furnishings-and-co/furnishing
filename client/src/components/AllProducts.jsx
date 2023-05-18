import React, { useState } from 'react';
import {DisplayProducts} from '../api/products'
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import "../styles/Products.css"
// import { ToastContainer } from 'react-toastify';


const AllProducts = () => {
  // const navigate=useNavigate()

  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getProducts() {
      const products = await DisplayProducts()
      setProducts(products)
    }
    getProducts();
  }, [])


  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <p>{product.name}</p>
            <p>Description: {product.description}</p>
            <p>${product.price}</p>
            <img style={{ height: "400px", }} src={product.picture} alt="" />
          </div>
        );
      })}
    </div>
  );
}

export default AllProducts