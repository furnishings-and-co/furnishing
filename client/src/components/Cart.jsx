import React from 'react';
import { DisplayCart } from '../api/cart';
import { useState, useEffect } from 'react';

const Cart = ({cart, setCart}) => {
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
        <ul>
          {cart.products?.map((product) => {
            return (
              <li>
                {product.name}({product.quantity})
                <button
                  onClick={async () => {
                    const updatedCart = await deleteProductFromCart(product.id);
                  }}
                >
                  DELETE PRODUCT
                </button>
              </li>
            );
          })}
        </ul>
        <button
          onClick={async () => {
            const newCart = await purchaseCart();
          }}
        >
          PURCHASE CART
        </button>
      </div>
    );
  };
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