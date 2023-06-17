const BASE_URL = "api";

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

export async function GetProduct(id) {
  try {
    console.log(id)
    const response = await fetch(`${BASE_URL}/products/single/${id}`, {
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

export async function createProduct(
  name,
  description,
  price,
  picture,
  category
) {
  try {
    const response = await fetch(`${BASE_URL}/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price,
        picture,
        category,
      }),
    });
    const data = await response.json();
    return data.productId;
  } catch (error) {
    console.error(error.message || "Failed to create product");
  }
}

export async function updateProduct(
  id,
  name,
  description,
  price,
  picture,
  category
) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price,
        picture,
        category,
      }),
    });
    return response.status === 204;
  } catch (error) {
    console.error(error.message || "Failed to update product");
  }
}

export async function deleteProduct(id) {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return;
  }
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    return response.status === 204;
  } catch (error) {
    console.error(error.message || "Failed to delete product");
  }
}
