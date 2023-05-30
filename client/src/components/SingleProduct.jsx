import React, { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetProduct } from '../api/products';
import { addProductToCart } from '../api/cart';

const SingleProduct = ({setCart}) => {
    const {id}= useParams()
   const navigate=useNavigate()

        const [product, setProduct]=useState({})
        
            
        useEffect(()=>{
             async function getSingleProduct (){
                const product= await GetProduct(id)
            setProduct(product)}
            getSingleProduct()
            },[])
            // console.log(product, "useEffect")
            return (
                <div 
                
                key={product.id}>
                  <p>{product.name}</p>
                  <p>Description: {product.description}</p>
                  <p>$:{product.price}</p>
                  <img style={{height:"400px",}} src={product.picture} alt="" />
                  <button onClick={() => navigate('/products')}>back</button>
                  <button onClick={async() =>{const updatedCart= await addProductToCart(product.id)
                  setCart(updatedCart)
                }}>Add to cart</button>
                  

                  {/* <button onClick={
                    async()=>{await addProductToCart(product.id);
                navigate('/')}}
                    >Delete</button> */}
                </div>)

}
               
        

export default SingleProduct;
