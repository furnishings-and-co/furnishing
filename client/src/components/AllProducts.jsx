import React, { useState } from 'react';
import { DisplayProducts } from '../api/products';
import { useEffect } from 'react';
import "../styles/Products.css";
import { useNavigate } from 'react-router-dom';
import { addProductToCart } from '../api/cart';
import { checkAdmin } from '../api/users';
import AddProduct from './AddProduct';

const AllProducts = ({ setCart, admin, setAdmin }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false); // Track the visibility of the form
  
  
  useEffect(() => {
  const useAdmin= async() => {
     const isAdmin = await checkAdmin();
     setAdmin(isAdmin)
  };
useAdmin()
}, []);
  useEffect(() => {
    async function getProducts() {
      const products = await DisplayProducts();
      setProducts(products);
    }
    getProducts();
  }, []);

  const onClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleAddProduct = () => {
    setShowAddProductForm(true);
  };
  

  const handleAddToCart = async (productId) => {
    const updatedCart = await addProductToCart(productId);
    setCart(updatedCart);
  };
  if(admin){
  return (
    <div className='section'>
      <div className="left">
        <button className='category' onClick={() => onClick(null)}>SHOP ALL</button>
        <button className='category' onClick={() => onClick("chair")}>CHAIRS</button>
        <button className='category' onClick={() => onClick("couch")}>COUCHES</button>
        <button className='category' onClick={() => onClick("light")}>LIGHTS</button>
        <button className='category' onClick={() => onClick("table")}>TABLES</button>
        {checkAdmin() && (
          <>
            <button className='category' onClick={handleAddProduct}>ADD PRODUCT</button>
            {showAddProductForm && <AddProduct />}
          </>
        )}
      </div>
      <div>
        {filteredProducts.map((product) => {
          return (
            <div key={product.id} className='right'>
              <div  className='product-container'>
                <img className='image' style={{ height: "400px" }} src={product.picture} alt="" />
                <div className='info-container'>
                  <p className='name'>{product.name}</p>
                  <p className='description'>{product.description}</p>
                  <div className='price-button-container'>
                    <p className='price'>${product.price}</p>
                    <div className='button-container'>
                      <button className='aButton' onClick={() => navigate(`/products/single/${product.id}`)}>View Product</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );}

  else{
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
              <div key={product.id} className='right'>
                <div  className='product-container'>
                  <img className='image' style={{ height: "400px" }} src={product.picture} alt="" />
                  <div className='info-container'>
                    <p className='name'>{product.name}</p>
                    <p className='description'>{product.description}</p>
                    <div className='price-button-container'>
                      <p className='price'>${product.price}</p>
                      <div className='button-container'>
                        <button className='aButton' onClick={() => navigate(`/products/single/${product.id}`)}>View Product</button>
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
}

export default AllProducts;