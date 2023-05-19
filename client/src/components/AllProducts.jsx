import React, { useState } from 'react';
import { DisplayProducts } from '../api/products'
import { useEffect } from 'react';

import "../styles/Products.css"

import { productsToMap } from '../api/data';

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? productsToMap.filter((product) => product.category === selectedCategory)
    : productsToMap;

  return (
    <div>
      <div className="category">
      <button onClick={() => onClick("chair")}>CHAIRS</button>
        <button onClick={() => onClick("couch")}>COUCHES</button>
        <button onClick={() => onClick("light")}>LIGHTS</button>
        <button onClick={() => onClick("table")}>TABLES</button>
      </div>
      <div>
        {filteredProducts.map((product) => {
          return (
            <div key={product.id}>
              <img style={{ height: "400px", }} src={product.picture} alt="" />
              <p>{product.name}</p>
              <p>Description: {product.description}</p>
              <p>${product.price}</p>
              <button>Add To Cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllProducts