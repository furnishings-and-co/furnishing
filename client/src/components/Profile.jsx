import React from 'react';
import { DisplayPurchased } from '../api/purchased';
import {useEffect } from 'react';

const Profile = ({cart, setCart, items, setItems}) => {
    

  useEffect(() => {
    async function fetchData() {
      console.log("profilecart.id", cart.id)
      // Call the addCartToProfile function with the desired cartId
      const updatedProfile = await DisplayPurchased(cart.id);
      setItems(updatedProfile)
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Purchased Items</h2>
      {!items || items.length === 0 ? (
        <p>You have not purchased any items</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <img className='image' style={{ height: "400px" }} src={item.picture} alt="" />
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Purchased At: {item.purchased_at}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;