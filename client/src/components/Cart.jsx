import React, { useState, useEffect } from 'react';
import { deleteProductFromCart, clearCart } from '../api/cart';
import { addCartToProfile } from '../api/purchased';
import '../styles/Cart.css';

const Cart = ({ cart, setCart, items, setItems }) => {

  return (
    <div className='cartContainer'>
      <h2 className='myCart'>My Cart</h2>
      {cart.products?.map((product) => {
        return (
          <div key={product.id} className="cart-product-container">
            <img className="cart-product-image" src={product.picture} alt="" />
            <div className="cart-product-details">
              <p className='name'>{product.name}</p>
              <p className='description'>{product.description}</p>
              <p className='quantity'> Quantity: {product.quantity}</p>
              <p className='price'>${product.price}</p>
              <button
                onClick={async () => {
                  const updatedCart = await deleteProductFromCart(product.id);
                  setCart(updatedCart);
                }}
              >
                DELETE PRODUCT
              </button>
            </div>
          </div>
        );
      })}
      <button
        className='checkout'
        onClick={async () => {
          console.log(cart.id);
          const newCart = await addCartToProfile(cart.id);
          setItems(newCart);
          const clear = await clearCart();
          setCart(clear);
        }}
      >
        CHECKOUT
      </button>
    </div>
  );
};

export default Cart;