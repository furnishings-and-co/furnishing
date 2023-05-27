import React from 'react';
import { DisplayPurchased } from '../api/purchased';
import { useEffect } from 'react';
import '../styles/Profile.css'

const Profile = ({ items, setItems }) => {


  useEffect(() => {
    async function fetchData() {
      const cartString = window.localStorage.getItem("cart");
      const cart = JSON.parse(cartString);

      if (cart && cart.id) {
        const updatedProfile = await DisplayPurchased(cart.id);
        setItems(updatedProfile);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='profileContainer'>
      <h2 className='profileTitle'>Purchase History</h2>
      {!items || items.length === 0 ? (
        <p className='profileTitle' >You have not purchased any items</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} className='single-product-container'>
              <img className='single-product-image' src={item.picture} alt='' />
              <div className='single-product-details'>
                <p className='name'>{item.name}</p>
                <p className='description'>{item.description}</p>
                <p className='price'>${item.price}</p>
                <p className='quantity'>Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;