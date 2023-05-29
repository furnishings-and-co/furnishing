const BASE_URL= "http://localhost:8080/api"

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
  console.log("response cart api front",response)
  const updatedCart = await response.json();
  console.log("updated cart",updatedCart)
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
      console.log ("delete response", response)
      const updatedCart = await response.json();
      console.log("delete updatedCart", updatedCart)
      return updatedCart;
    };

    // export async function addProductToCart(productId) {
//   console.log("Nope")
//   try {
//       const response = await fetch(`${BASE_URL}/products/${productId}`, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       const result = await response.json();
//       console.log("hello")
//       console.log(result)
//       return result;
//     } catch (err) {
//       console.error(err);
//     }
//   }

  // export async function DisplayCart() {
  //   console.log("Nope")
  //   try {
  //       const response = await fetch(`${BASE_URL}/cart`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
    
  //       const result = await response.json();
  //       console.log("display cart")
  //       console.log(result)
  //       return result;
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }