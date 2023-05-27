const BASE_URL = "api";

export async function addCartToProfile(cartId) {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return;
  }
  try {
    const response = await fetch(`${BASE_URL}/purchased/${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedProfile = await response.json();
    return updatedProfile;
  } catch (err) {
    console.error(err);
  }
}

export async function DisplayPurchased(cartId) {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return;
  }
  try {
    const response = await fetch(`${BASE_URL}/purchased/${cartId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}
