const BASE_URL= "http://localhost:8080/api"

export async function addCartToProfile(cartId) {
    console.log("cartId", cartId)
    const token = window.localStorage.getItem('token');
    console.log("token in profile api front", token)
    if (!token) {
      return;
    }
    try{
    const response = await fetch(`${BASE_URL}/purchased/${cartId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response profile api front", response)
    console.log("response status:", response.status);
    console.log("response body:", await response.text());
    const updatedProfile = await response.json();
    console.log("updated profile" ,updatedProfile)
    return updatedProfile;
}
catch (err) {
  console.error(err);
}
};

  export async function DisplayPurchased(cartId) {
    console.log("Nope", cartId)
    const token = window.localStorage.getItem('token');
    console.log("token in profile api front", token)
    if (!token) {
      return;
    }
    try {
        const response = await fetch(`${BASE_URL}/purchased/${cartId}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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