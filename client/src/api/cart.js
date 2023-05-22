const BASE_URL= "http://localhost:8080/api"

export async function addProductToCart(productId) {
  console.log("Nope")
  try {
      const response = await fetch(`${BASE_URL}/products/${productId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const result = await response.json();
      console.log("hello")
      console.log(result)
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  export async function DisplayCart() {
    console.log("Nope")
    try {
        const response = await fetch(`${BASE_URL}/cart`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        const result = await response.json();
        console.log("display cart")
        console.log(result)
        return result;
      } catch (err) {
        console.error(err);
      }
    }