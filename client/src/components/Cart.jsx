import React from 'react';
import { DisplayCart } from '../api/cart';
import { useState, useEffect } from 'react';

const Cart = () => {
    
    
    useEffect(() => {
      async function getCart() {
        const cart = await DisplayCart()
        setCart(cart)
      }
      getCart();
    }, [])
    if(cart){
    return (
        <div>
             {cart.map((product) => {
          return (
            <div key={product.id}>
              <img style={{ height: "400px", }} src={product.picture} alt="" />
              <p>{product.name}</p>
              <p>Description: {product.description}</p>
              <p>${product.price}</p>
              {/* <button onClick={() => onClick(addProductToCart(product.id))}>Add To Cart</button> */}
            </div>
          );
        })}
        </div>
    );}
    else{
        return(
            <div>Nothing in Cart</div>
        )
    }
};

export default Cart;