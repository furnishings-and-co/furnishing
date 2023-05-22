const BASE_URL= "http://localhost:8080/api"


export async function DisplayProducts() {
  console.log("Nope")
  try {
      const response = await fetch(`${BASE_URL}/products`, {
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

  export async function GetProduct(id) {
    try {
      const response = await fetch(`${BASE_URL}/products/single/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result, "get product result")
      return result;
  
    //   if (!result.error) {
    //       return result;
    //     } else {
    //       toast.error(result.message || "Registration failed. Please try again.", {
    //         position: "bottom-center",
    //         autoClose: 3000,
    //         style: {
    //           fontSize: "16px",
    //         },
    //       });
    //     }
    } catch (err) {
      console.error(err);
    }
  }
  export async function GetProductsByCategory(category) {
    try {
      const response = await fetch(`${BASE_URL}/products/${category}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
    }
  }

