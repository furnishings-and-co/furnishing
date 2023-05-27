const BASE_URL = "api";

export async function createAdminProduct(
  name,
  description,
  price,
  picture,
  category
) {
  try {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = await fetch(`${BASE_URL}/products/admin/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        price,
        picture,
        category,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    const createdProduct = await response.json();
    return createdProduct;
  } catch (error) {
    console.error("Error:", error);
  }
}
