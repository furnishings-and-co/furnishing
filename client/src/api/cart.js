const BASE_URL = "http://localhost:8080/api"

export async function addProductToCart(productId) {
  console.log("productId", productId)
  const token = window.localStorage.getItem('token');
  console.log("token in cart api front", token)
  if (!token) {
    return;
  }
  const response = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("response cart api front", response)
  const updatedCart = await response.json();
  console.log("updated cart", updatedCart)
  return updatedCart;
};

export async function deleteProductFromCart(productId) {
  console.log("productID", productId)
  const token = window.localStorage.getItem('token');
  console.log("delete token", token)
  if (!token) return;
  const response = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("delete response", response)
  const updatedCart = await response.json();
  console.log("delete updatedCart", updatedCart)
  return updatedCart;
};

export const clearCart = async () => {
  try {
    const token = window.localStorage.getItem('token');
    if (!token) return;
    const response = await fetch(`${BASE_URL}/cart/clear/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const newCart = await response.json();
    return newCart;
  } catch (error) {
    console.log(error)
  }
};

