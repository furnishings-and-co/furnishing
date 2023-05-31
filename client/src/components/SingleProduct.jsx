import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetProduct } from '../api/products';
import { addProductToCart } from '../api/cart';
import '../styles/singleProduct.css'

const SingleProduct = ({ setCart }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState({})


  useEffect(() => {
    async function getSingleProduct() {
      const product = await GetProduct(id)
      setProduct(product)
    }
    getSingleProduct()
  }, [])
  return (
    <div className='single-product-section'>
      <button className='backButton' onClick={() => navigate('/products')}>BACK</button>
      <div className='single-product-container' key={product.id}>
        <img className='single-product-image' style={{ height: "400px", }} src={product.picture} alt="" />
        <div className='single-product-details'>
          <p>{product.name}</p>
          <p>Description: {product.description}</p>
          <p>${product.price}</p>
          <div className='buttonContainer'>
            <button className='singleButton' onClick={async () => {
              const updatedCart = await addProductToCart(product.id)
              setCart(updatedCart)
            }}>Add to cart</button>
          </div>
        </div>
      </div>

    </div>)
}



export default SingleProduct;
