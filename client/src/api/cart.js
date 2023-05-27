const BASE_URL = "api";

export async function addProductToCart(productId) {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return;
  }
  const response = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const updatedCart = await response.json();
  return updatedCart;
}

export async function deleteProductFromCart(productId) {
  const token = window.localStorage.getItem("token");
  if (!token) return;
  const response = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const updatedCart = await response.json();
  return updatedCart;
}

export const clearCart = async () => {
  try {
    const token = window.localStorage.getItem("token");
    if (!token) return;
    const response = await fetch(`${BASE_URL}/cart/clear/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const newCart = await response.json();
    return newCart;
  } catch (error) {
    console.log(error);
  }
};
