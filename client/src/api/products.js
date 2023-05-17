const BASE_URL= "https://localhost8080/api"


export async function DisplayProducts() {
    try {
      const response = await fetch(`${BASE_URL}/products`, {
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

  export async function GetProduct(Id) {
    try {
      const response = await fetch(`${BASE_URL}/products/${Id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
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

