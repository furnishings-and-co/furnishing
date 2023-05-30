import React from 'react';
import { deleteProductFromCart, clearCart } from '../api/cart';
import { useState, useEffect } from 'react';
import { addCartToProfile } from '../api/purchased';

const Cart = ({cart, setCart, items, setItems}) => {
    // useEffect(() => {
    //   async function getCart() {
    //     const cart = await DisplayCart()
    //     setCart(cart)
    //   }
    //   getCart();
    // }, [])

    return (
      <div>
      <h2>My products:</h2>
      {cart.products?.map((product) => {
        return (
          <div key={product.id} className="single-product-container">
            <img className="single-product-image" src={product.picture} alt="" />
            <div className="single-product-details">
              <p>{product.name}</p>
              <p>{product.quantity}</p>
              <p>{product.price}</p>
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
        onClick={async () => {
          console.log(cart.id);
          const newCart = await addCartToProfile(cart.id);
          setItems(newCart);
          // const clear = await clearCart();
          // setCart(clear);
        }}
      >
        PURCHASE CART
      </button>
    </div>
    );}
//     if(cart){
//     return (
//         <div>
//              {cart.map((product) => {
//           return (
//             <div key={product.id}>
//               <img style={{ height: "400px", }} src={product.picture} alt="" />
//               <p>{product.name}</p>
//               <p>Description: {product.description}</p>
//               <p>${product.price}</p>
//               {/* <button onClick={() => onClick(addProductToCart(product.id))}>Add To Cart</button> */}
//             </div>
//           );
//         })}
//         </div>
//     );}
//     else{
//         return(
//             <div>Nothing in Cart</div>
//         )
//     }
// };

export default Cart;